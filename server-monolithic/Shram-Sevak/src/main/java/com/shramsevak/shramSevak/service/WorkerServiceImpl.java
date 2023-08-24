package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Pageable;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.customException.WorkerException;
import com.shramsevak.shramSevak.dto.CustomerResponceDto;
import com.shramsevak.shramSevak.dto.WorkerRegistrationDto;
import com.shramsevak.shramSevak.dto.WorkerResponceDto;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.entity.Locality;
import com.shramsevak.shramSevak.entity.Skill;
import com.shramsevak.shramSevak.entity.Worker;
import com.shramsevak.shramSevak.entity.WorkerStatus;
import com.shramsevak.shramSevak.repository.LocalityRepository;
import com.shramsevak.shramSevak.repository.SkillRepository;
import com.shramsevak.shramSevak.repository.WorkerRepository;

import jakarta.transaction.Transactional;
import static com.shramsevak.shramSevak.util.Utils.checkStatus;
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
	private ModelMapper mapper;
	
	@Override
	public String register(WorkerRegistrationDto workerDto) {
		Worker worker = mapper.map(workerDto, Worker.class);
		Locality locality = localityRepo.findById(workerDto.getLocalityId()).orElseThrow(() -> new RuntimeException("Invalid locality ID"));
		List<Skill> skills = skillRepo.findAllById(workerDto.getSkillIds());
		worker.setStatus(WorkerStatus.ACTIVE);
		workerRepo.save(worker);
		locality.addWorker(worker);
		skills.stream().forEach(skill -> worker.addSkill(skill));
		
		
		return "Worker added successfully";
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
	public WorkerResponceDto getWorkerDetails(Long id) {
    Worker worker=workerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Customer ID!!!"));
		
		return mapper.map(worker,WorkerResponceDto.class);
	}


	@Override
	public List<WorkerResponceDto> getAllWorkers(int pageNumber, int pageSize) {
		
     Pageable pageable = PageRequest.of(pageNumber, pageSize);
		
		List<Worker> workerList = workerRepo.findAll(pageable).getContent();
		return workerList.stream().
				map( worker -> mapper.map(worker, WorkerResponceDto.class))
				.collect(Collectors.toList());
		
	}
	
		

}
