package com.shramsevak.shramSevak.service;

import java.time.LocalDateTime;
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
import com.shramsevak.shramSevak.dto.CreateOrderDTO;
import com.shramsevak.shramSevak.dto.OrderDTO;
import com.shramsevak.shramSevak.entity.Customer;
import com.shramsevak.shramSevak.entity.Order;
import com.shramsevak.shramSevak.entity.OrderStatus;
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
	
	@Override
	public ApiResponse createOrder(CreateOrderDTO orderDetails) {
		Customer customer = customerRepo.findById(orderDetails.getCustomerId()).orElseThrow(() -> new CustomerException("No such customer found."));
		Worker worker = workerRepo.findById(orderDetails.getWorkerId()).orElseThrow(() -> new WorkerException("No such worker found."));
		Order order = mapper.map(orderDetails, Order.class);
		order.setStatus(OrderStatus.CREATED);
		customer.addOrder(order);
		worker.addOrder(order);
		orderRepo.save(order);
		return new ApiResponse("Order placed successfully. ORDER_ID : " + order.getId());
	}

	@Override
	public ApiResponse fulfillOrder(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderException("No such order found."));
		if(order.getStartTime().isAfter(LocalDateTime.now()) || !order.getStatus().equals(OrderStatus.CONFIRMED))
			throw new OrderException("INVALID OPERATION : can not fulfill an order before its scheduled time");
		order.setStatus(OrderStatus.FULFILLED);
		return new ApiResponse("Order fulfilled. ORDER_ID : " + order.getId());
	}

	@Override
	public ApiResponse cancelOrder(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderException("No such order found."));
		if(!order.getStatus().equals(OrderStatus.CREATED))
			throw new OrderException("INVALID OPERATION : can not cancel the order in " + order.getStatus() + " state.");
		order.setStatus(OrderStatus.CANCELLED);
		if(LocalDateTime.now().minusHours(1).isBefore(order.getStartTime()))
			return new ApiResponse("Order cancelled. 80% amount will be refunded within 5 working days. ORDER_ID : " + order.getId());
		return new ApiResponse("Order cancelled. ORDER_ID : " + order.getId());
	}

	@Override
	public ApiResponse suspendOrder(Long orderId) {
		Order order = orderRepo.findById(orderId).orElseThrow(() -> new OrderException("No such order found."));
		if(order.getStatus().equals(OrderStatus.SUSPENDED))
			throw new OrderException("INVALID OPERATION : can not suspend an already suspended order");
		order.setStatus(OrderStatus.SUSPENDED);
		return new ApiResponse("Order suspended. ORDER_ID : " + order.getId());
	}
	
}
