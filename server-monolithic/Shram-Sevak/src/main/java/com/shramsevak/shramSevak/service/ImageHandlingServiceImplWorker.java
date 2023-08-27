package com.shramsevak.shramSevak.service;
import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.shramsevak.shramSevak.customException.ApiException;
import com.shramsevak.shramSevak.customException.ResourceNotFoundException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.entity.Worker;
import com.shramsevak.shramSevak.repository.WorkerRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;


@Service
@Transactional
public class ImageHandlingServiceImplWorker implements ImageHandlingService {
	
	@Value("${file.upload.location}")
	private String uploadFolder;
	
	@Autowired
	private WorkerRepository workerRepo;

	
	@PostConstruct
	public void init() throws IOException {
		// Check if folder exists --yes --continue
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}
	
	@Override
	public ApiResponse uploadImage(Long workerId, MultipartFile image) throws IOException {
		
		Worker worker =  workerRepo.findById(workerId).orElseThrow(()-> new ResourceNotFoundException("Invalid User Id"));
		   LocalDate currentDate = LocalDate.now();
		    LocalTime currentTime = LocalTime.now();
		    String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		    String formattedTime = currentTime.format(DateTimeFormatter.ofPattern("HH-mm"));
			  // Generate a unique file name based on the worker's ID
//		    String fileName = "workerId_" + workerId + "_Date_" + formattedDate+"_Time_"+formattedTime+"_"+System.currentTimeMillis();
		    String fileName = "workerId_" + workerId;

	    String path = uploadFolder.concat(fileName);
		System.out.println(path);
		writeByteArrayToFile(new File(path), image.getBytes());
		// set image path
		worker.setProfilePicturePath(fileName);
		// OR to store the image directly in DB as a BLOB
		// emp.setImage(image.getBytes());
		workerRepo.save(worker);
		return new ApiResponse("Image file uploaded successfully for Worker id " + workerId);
	}

	@Override
	public byte[] serveImage(Long workerId) throws IOException {
	Worker worker =  workerRepo.findById(workerId).orElseThrow(()-> new ResourceNotFoundException("Invalid Worker Id"));
	String path =worker.getProfilePicturePath();
	if(path != null) {
		// path ---> File --> byte[]
//		return readFileToByteArray(new File(path));
		workerRepo.save(worker);
		return readFileToByteArray(new File(uploadFolder.concat(path)));
		//OR from DB : return emp.getImage();
	} else
		throw new ApiException("Image not yet assigned !!!!");
	}

}
