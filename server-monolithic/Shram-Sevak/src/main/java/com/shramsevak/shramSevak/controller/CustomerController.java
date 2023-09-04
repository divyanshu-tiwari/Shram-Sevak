package com.shramsevak.shramSevak.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CustomerResponceDto;
import com.shramsevak.shramSevak.dto.CustomerSignUpRequest;
import com.shramsevak.shramSevak.dto.CustomerUpdateDto;
import com.shramsevak.shramSevak.dto.SigninRequest;
import com.shramsevak.shramSevak.service.CustomerService;
import com.shramsevak.shramSevak.service.ImageHandlingService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

	@Autowired
	private CustomerService custService;

	
	@Autowired
	private ImageHandlingService imageService;
	

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerCustomer(@RequestBody @Valid CustomerSignUpRequest newCustomer) {
    	
    		System.out.println(newCustomer);
        ApiResponse response = custService.registerCustomer(newCustomer);
        return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
    	
    }
	  
    @GetMapping("/getCustomer/{id}")
    public ResponseEntity<?> getCustomerDetailsById(@PathVariable Long id){
    	return ResponseEntity.ok(custService.getCustomerDetails(id));
    }

	@GetMapping("/all")
	public ResponseEntity<?> getAllCustPaginated(@RequestParam(defaultValue = "0", required = false) int pageNumber,
			@RequestParam(defaultValue = "3", required = false) int pageSize) {
		System.out.println("in get all customers" + pageNumber + " " + pageSize);
		List<CustomerResponceDto> list = custService.getAllCustomers(pageNumber, pageSize); 
		if (list.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

		return ResponseEntity.ok(list);
	}

	@DeleteMapping("/deletePermanent/{Id}")
	public ResponseEntity<?> deleteCustomerPermanently(@PathVariable Long Id) {
		log.info("Customer Controller - delete customer");
		return new ResponseEntity<>(custService.deleteByIdPermanently(Id), HttpStatus.OK);
	}

	@PutMapping("/delete/{Id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable Long Id) {
		log.info("Customer Controller - delete customer temparary");
		return new ResponseEntity<>(custService.deleteById(Id), HttpStatus.OK);

	}

	@PutMapping("/update")
	public ResponseEntity<?> updateCustomerDetails(@RequestBody CustomerUpdateDto customerDto) {
		log.info("Customer Controller - updating  customer");
		return new ResponseEntity<>(custService.updateCustomer(customerDto), HttpStatus.OK);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> customerLogin(@RequestBody @Valid SigninRequest request) {
		System.out.println("Customer login " + request);
		log.info("Customer Controller - Login  customer");
			return new ResponseEntity<>(custService.authenticate(request),
					HttpStatus.OK);
		}
    
    // Upload image
 	@PostMapping(value = "/images", consumes = "multipart/form-data")
 	public ResponseEntity<?> uploadImage(@RequestParam Long customerId,@RequestParam MultipartFile image)
 			throws IOException {
 		System.out.println("in upload image " + customerId);
 		log.info("Customer Controller - Upload image  customer");
 		return ResponseEntity.status(HttpStatus.CREATED).body(imageService.uploadImage(customerId, image));
 	}
 	
 	
 	// download image
 	@GetMapping(value = "/images/{customerId}",
 			produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
 	public ResponseEntity<?> downloadImage(@PathVariable Long customerId) throws IOException {
 		System.out.println("in download image " + customerId);
 		log.info("Customer Controller - Dounload image  customer");
 		return ResponseEntity.ok(imageService.serveImage(customerId));
 	}	

	
	@PatchMapping("/suspend/{customerId}")
	public ResponseEntity<?> suspendCustomer(@PathVariable Long customerId){
		return new ResponseEntity<>(custService.suspendCustomer(customerId), HttpStatus.OK);
	}
	
	@PatchMapping("/activate/{customerId}")
	public ResponseEntity<?> activateCustomer(@PathVariable Long customerId){
		return new ResponseEntity<>(custService.activateCustomer(customerId), HttpStatus.OK);
	}

}