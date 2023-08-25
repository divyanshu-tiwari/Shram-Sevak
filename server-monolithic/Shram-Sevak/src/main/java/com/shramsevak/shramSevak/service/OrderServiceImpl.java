package com.shramsevak.shramSevak.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.shramsevak.shramSevak.customException.CustomerException;
import com.shramsevak.shramSevak.customException.OrderException;
import com.shramsevak.shramSevak.customException.WorkerException;
import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.OrderDTO;
import com.shramsevak.shramSevak.dto.PlaceOrderDTO;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.entity.Order;
import com.shramsevak.shramSevak.entity.Worker;
import com.shramsevak.shramSevak.repository.CustomerRepository;
import com.shramsevak.shramSevak.repository.OrderRepository;
import com.shramsevak.shramSevak.repository.WorkerRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private WorkerRepository workerRepo;
	@Autowired
	private CustomerRepository customerRepo;
	
	@Override
	public List<OrderDTO> getAll(int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		return orderRepo.findAll(pageable).getContent().stream().map(order -> mapper.map(order, OrderDTO.class)).collect(Collectors.toList());
	}

	@Override
	public OrderDTO getById(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(()-> new OrderException("Order not found"));
		return mapper.map(order, OrderDTO.class);
	} 

	@Override
	public List<OrderDTO> getAllByWorkerId(Long workerId) {
		log.info("in getAllByWorkerId => workerId : " + workerId );
		
		List<OrderDTO> orders = orderRepo.findByWorkerId(workerId).stream().map(order ->  mapper.map(order, OrderDTO.class)).collect(Collectors.toList());
		if(orders.isEmpty())
			throw new OrderException("No orders found for the worker");
		return orders;
	}

	@Override
	public List<OrderDTO> getAllByCustomerId(Long customerId) {
		log.info("in getAllByCustomerId => customerId : " + customerId );
		
		List<OrderDTO> orders = orderRepo.findByCustomerId(customerId).stream().map(order ->  mapper.map(order, OrderDTO.class)).collect(Collectors.toList());
		if(orders.isEmpty())
			throw new OrderException("No orders found for the customer");
		return orders;
	}

	/*
	 * @Override public ApiResponse placeOrder(Long customerId, Long workerId,
	 * PlaceOrderDTO orderDetails) { log.info("inside placeOrder"); Customer
	 * customer = customerRepo.findById(customerId).orElseThrow(() -> new
	 * CustomerException("No such customer found."));
	 * log.info("Customer record found"); Worker worker =
	 * workerRepo.findById(workerId).orElseThrow(() -> new
	 * WorkerException("No such worker found.")); log.info("Worker record found");
	 * Order order = mapper.map(orderDetails, Order.class);
	 * log.info("order entity mapped"); log.info(order.toString());
	 * customer.addOrder(order); worker.addOrder(order); orderRepo.save(order);
	 * log.info("order persisted");
	 * 
	 * return new ApiResponse("Order placed successfully. ORDER_ID : " +
	 * order.getId()); }
	 */
	
	@Override
	public ApiResponse placeOrder(PlaceOrderDTO orderDetails) {
		log.info("inside placeOrder");	
		Customer customer = customerRepo.findById(1L).orElseThrow(() -> new CustomerException("No such customer found."));
		log.info("Customer record found");
		Worker worker = workerRepo.findById(1L).orElseThrow(() -> new WorkerException("No such worker found."));
		log.info("Worker record found");
		Order order = mapper.map(orderDetails, Order.class);
		log.info("order entity mapped");	
		log.info(order.toString());
		customer.addOrder(order);
		worker.addOrder(order);
		orderRepo.save(order);
		log.info("order persisted");
		
		return new ApiResponse("Order placed successfully. ORDER_ID : " + order.getId());
	}

	
}
