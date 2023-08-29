package com.shramsevak.shramSevak.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shramsevak.shramSevak.dto.CreateOrderDTO;
import com.shramsevak.shramSevak.dto.TransactionUpdateRequestDTO;
import com.shramsevak.shramSevak.service.OrderService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/order")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0", required = false) int pageNumber,
			@RequestParam(defaultValue = "5", required = false) int pageSize){
		return new ResponseEntity<>(orderService.getAll(pageNumber, pageSize), HttpStatus.OK);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<?> getById(@PathVariable Long orderId){
		return new ResponseEntity<>(orderService.getById(orderId), HttpStatus.OK);
	}
	
	@GetMapping("/customer/{customerId}")
	public ResponseEntity<?> getAllByCustomerId(@PathVariable Long customerId){
		return new ResponseEntity<>(orderService.getAllByCustomerId(customerId), HttpStatus.OK);
	}
	
	@GetMapping("/worker/{workerId}")
	public ResponseEntity<?> getAllByWorkerId(@PathVariable Long workerId){
		return new ResponseEntity<>(orderService.getAllByWorkerId(workerId), HttpStatus.OK);
	}
	
	
	@PostMapping("/create")
	public ResponseEntity<?> createOrder(@RequestBody @Valid CreateOrderDTO orderDetails){
		log.info("order details in controller : " + orderDetails.toString());
		return new ResponseEntity<>(orderService.createOrder(orderDetails), HttpStatus.CREATED);
	}
		
	@PatchMapping("/fulfill/{orderId}")
	public ResponseEntity<?> fulfillOrder(@PathVariable Long orderId){
		return new ResponseEntity<>(orderService.fulfillOrder(orderId), HttpStatus.ACCEPTED);
	}
	
	@PatchMapping("/cancel/{orderId}")
	public ResponseEntity<?> cancelOrder(@PathVariable Long orderId){
		return new ResponseEntity<>(orderService.cancelOrder(orderId), HttpStatus.ACCEPTED);
	}
	
	@PatchMapping("/suspend/{orderId}")
	public ResponseEntity<?> suspendOrder(@PathVariable Long orderId){
		return new ResponseEntity<>(orderService.suspendOrder(orderId), HttpStatus.ACCEPTED);
	}
	
	@PatchMapping("/update-transaction")
	public ResponseEntity<?> updateTransaction(@RequestBody TransactionUpdateRequestDTO updateRequest){
		return new ResponseEntity<>(orderService.updateTransaction(updateRequest), HttpStatus.OK);
	}
}
