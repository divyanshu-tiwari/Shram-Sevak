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
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.dto.SigninResponse;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponseDTO;
import com.shramsevak.shramSevak.entity.Locality;
import com.shramsevak.shramSevak.entity.OrderStatus;
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
		Locality locality = localityRepo.findById(workerDto.getLocalityId()).orElseThrow(() -> new RuntimeException("Invalid locality ID"));
		locality.addWorker(worker);
		worker.setStatus(WorkerStatus.PENDING);
		workerRepo.save(worker);
		WorkerResponseDTO workerResp=mapper.map(worker, WorkerResponseDTO.class);
		return workerResp;
	}
	

   @Override
	public String deleteByIdPermanently(Long id) {
		Worker worker=workerRepo.findById(id).orElseThrow(() -> new WorkerException("Invalid myworker ID"));
		workerRepo.delete(worker);
		
	  return "Worker " + worker.getFirstName()+" "+worker.getLastName()+ "'s  details deleted Permanantly!";
	}

	@Override
	public String deleteById(Long id) {
		Worker worker=workerRepo.findById(id).orElseThrow(() -> new WorkerException("Invalid worker ID"));
		checkStatus(worker);
		worker.setStatus(WorkerStatus.INACTIVE);
		
		return worker.getFirstName()+" "+worker.getLastName()+"s  details deleted!";
	}


	@Override

	public SigninResponse authenticate(@Valid SigninRequest request) {
	 Worker worker = workerRepo.findByContactAndPassword(request.getContact(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!!!!!!!!!!!"));
		
		return mapper.map(worker, SigninResponse.class);
	}

  @Override
	public WorkerResponseDTO getWorkerDetails(Long id) {
    Worker worker=workerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID!!!"));
		
		return mapper.map(worker,WorkerResponseDTO.class);
	}


	@Override
	public List<WorkerResponseDTO> getAllWorkers(int pageNumber, int pageSize) {
		
     Pageable pageable = PageRequest.of(pageNumber, pageSize);
		
		List<Worker> workerList = workerRepo.findAll(pageable).getContent();
		return workerList.stream().
				map( worker -> mapper.map(worker, WorkerResponseDTO.class))
				.collect(Collectors.toList());
		
	}


	@Override
	public List<WorkerResponseDTO> getAvailableWorkersBySlotAndSkill(Long skillId, LocalDateTime startTime, LocalDateTime endTime, int pageNumber, int pageSize) {
		Set<Worker> workersWithDesiredSkill = skillRepo.findById(skillId).orElseThrow(() -> new ResourceNotFoundException("No such skill found.")).getWorkers(); 
		Set<Worker> unavailableWorkers = orderRepo.findAllByStartTimeIsAndStatus(startTime, OrderStatus.CONFIRMED).stream().map(order -> order.getWorker()).collect(Collectors.toSet());
		List<Worker> availableWorkers = workersWithDesiredSkill.stream().filter(Predicate.not(unavailableWorkers::contains)).distinct().toList();
		return availableWorkers.stream().map(worker -> mapper.map(worker, WorkerResponseDTO.class)).collect(Collectors.toList());
	}



	

}
