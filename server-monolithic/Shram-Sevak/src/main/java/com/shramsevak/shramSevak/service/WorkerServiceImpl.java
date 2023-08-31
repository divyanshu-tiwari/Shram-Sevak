package com.shramsevak.shramSevak.service;

import static com.shramsevak.shramSevak.util.Utils.checkStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.customException.WorkerException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.OrderResponseDTO;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.dto.WorkerLocalityRequestDTO;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponseDTO;
import com.shramsevak.shramSevak.dto.WorkerSkillsDTO;
import com.shramsevak.shramSevak.dto.WorkerUpdateRequestDto;
import com.shramsevak.shramSevak.dto.WorkerUpdateResponceDto;
import com.shramsevak.shramSevak.entity.Locality;
import com.shramsevak.shramSevak.entity.OrderStatus;
import com.shramsevak.shramSevak.entity.Skill;
import com.shramsevak.shramSevak.entity.Worker;
import com.shramsevak.shramSevak.entity.WorkerStatus;
import com.shramsevak.shramSevak.repository.LocalityRepository;
import com.shramsevak.shramSevak.repository.OrderRepository;
import com.shramsevak.shramSevak.repository.SkillRepository;
import com.shramsevak.shramSevak.repository.WorkerRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;



@Service
@Transactional
public class WorkerServiceImpl implements WorkerService {

	@Autowired
	private WorkerRepository workerRepo;
	@Autowired
	private LocalityRepository localityRepo;
	@Autowired
	private SkillRepository skillRepo;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private ModelMapper mapper;
	

	

	@Override
	public WorkerResponseDTO register(WorkerRegistrationDto workerDto) {
		Worker worker = mapper.map(workerDto, Worker.class);
		Locality locality = localityRepo.findById(workerDto.getLocalityId())
				.orElseThrow(() -> new RuntimeException("Invalid locality ID"));
		locality.addWorker(worker);
		worker.setStatus(WorkerStatus.PENDING);
		workerRepo.save(worker);
		WorkerResponseDTO workerResp = mapper.map(worker, WorkerResponseDTO.class);
		return workerResp;
	}

	@Override
	public String deleteByIdPermanently(Long id) {
		Worker worker = workerRepo.findById(id).orElseThrow(() -> new WorkerException("Invalid myworker ID"));
		workerRepo.delete(worker);

		return "Worker " + worker.getFirstName() + " " + worker.getLastName() + "'s  details deleted Permanantly!";
	}

	@Override
	public String deleteById(Long id) {
		Worker worker = workerRepo.findById(id).orElseThrow(() -> new WorkerException("Invalid worker ID"));
		checkStatus(worker);
		worker.setStatus(WorkerStatus.INACTIVE);
		return worker.getFirstName() + " " + worker.getLastName() + "s  details deleted!";
	}

	@Override
	public SigninResponse authenticate(@Valid SigninRequest request) {
		Worker worker = workerRepo.findByContactAndPassword(request.getContact(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!!!!!!!!!!!"));

		return mapper.map(worker, SigninResponse.class);
	}


	@Override
	public WorkerResponseDTO getWorkerDetails(Long id) {
		Worker worker = workerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID!!!"));
		return mapper.map(worker, WorkerResponseDTO.class);
	}

	@Override

	public List<WorkerResponseDTO> getAllWorkers(int pageNumber, int pageSize) {
		
     Pageable pageable = PageRequest.of(pageNumber, pageSize);
		
		List<Worker> workerList = workerRepo.findAll(pageable).getContent();
		List<WorkerResponseDTO> workerDtolist = workerList.stream().
				map( worker -> mapper.map(worker, WorkerResponseDTO.class))
				.collect(Collectors.toList());
		if(workerDtolist.isEmpty())
			throw new ResourceNotFoundException("No workers found");
		return workerDtolist;
		
	}


	@Override
	public WorkerUpdateResponceDto updateWorker(WorkerUpdateRequestDto workerUpdateDto) {
		Worker worker = workerRepo.findById(workerUpdateDto.getId())
				.orElseThrow(() -> new RuntimeException("Worker not found with id: " + workerUpdateDto.getId()));
		
		if(workerUpdateDto.getFirstName() != null) {
			worker.setFirstName(workerUpdateDto.getFirstName());
		}
		if(workerUpdateDto.getLastName() != null) {
			worker.setLastName(workerUpdateDto.getLastName());
		}
		if(workerUpdateDto.getGender() != null) {
			worker.setGender(workerUpdateDto.getGender());
		}
		if(workerUpdateDto.getContact() != null) {
			worker.setContact(workerUpdateDto.getContact());
		}
		if(workerUpdateDto.getEmail() != null) 	{
			worker.setEmail(workerUpdateDto.getEmail());
		}
		if(workerUpdateDto.getProfilePicturePath()!= null) {
			worker.setProfilePicturePath(workerUpdateDto.getProfilePicturePath());
		}
		
		return mapper.map(worker, WorkerUpdateResponceDto.class);
	}
	

	public List<WorkerResponseDTO> getAvailableWorkersBySlotAndSkill(Long skillId, LocalDateTime startTime, LocalDateTime endTime, int pageNumber, int pageSize) {
		Set<Worker> workersWithDesiredSkill = skillRepo.findById(skillId).orElseThrow(() -> new ResourceNotFoundException("No such skill found.")).getWorkers().stream().filter(worker -> worker.getStatus().equals(WorkerStatus.ACTIVE)).collect(Collectors.toSet()); 
		Set<Worker> unavailableWorkers = orderRepo.findAllByStartTimeIsAndStatus(startTime, OrderStatus.CONFIRMED).stream().map(order -> order.getWorker()).collect(Collectors.toSet());
		List<Worker> availableWorkers = workersWithDesiredSkill.stream().filter(Predicate.not(unavailableWorkers::contains)).distinct().toList();
		return availableWorkers.stream().map(worker -> mapper.map(worker, WorkerResponseDTO.class)).collect(Collectors.toList());
	}


	@Override
	public List<OrderResponseDTO> getAllConfirmedByWorkerId(Long workerId) {
		
		Worker worker = workerRepo.findById(workerId).orElseThrow(()->new WorkerException("Worker Not Found..."));
		
		List<OrderResponseDTO> orders = worker.getAcceptedOrders().stream().filter(order-> order.getStatus().equals(OrderStatus.CONFIRMED))
		.map(order -> {return mapper.map(order, OrderResponseDTO.class);})
		.collect(Collectors.toList());
		
		return orders;
	}


	@Override
	public ApiResponse updateSkillsByWorkerId(WorkerSkillsDTO workerSkills) {
		Worker worker = workerRepo.findById(workerSkills.getId())
				.orElseThrow(()->new WorkerException("Worker Not Found..."));
		
	  List<Skill> skills = workerSkills.getSkills().stream()
	  .map(id->skillRepo.findById(id).orElseThrow(()->new WorkerException("Matching Skill Not Found for id: "+id)))
	  .collect(Collectors.toList());
	  
	  skills.forEach(skill->worker.addSkill(skill));
		
		return new ApiResponse("Skills Updated Successfully");
	}


	@Override
	public ApiResponse updateLocalityByWorkerIdAndLocalityId(WorkerLocalityRequestDTO workerLocality) {
		
		Worker worker = workerRepo.findById(workerLocality.getWorkerId())
				.orElseThrow(()->new WorkerException("Matching Worker Not Found"));
		Locality locality = localityRepo.findById(workerLocality.getLocalityId())
				.orElseThrow(()->new WorkerException("Matching Locality Not Found"));
		locality.addWorker(worker);
		
		return new ApiResponse("Locality added to worker successfully");
	}

}
