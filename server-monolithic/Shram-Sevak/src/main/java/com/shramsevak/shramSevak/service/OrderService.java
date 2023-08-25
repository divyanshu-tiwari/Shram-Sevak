package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.OrderDTO;
import com.shramsevak.shramSevak.dto.PlaceOrderDTO;

public interface OrderService {
	
//	public ApiResponse placeOrder(Long customerId, Long workerId, PlaceOrderDTO orderDetails);
	public ApiResponse placeOrder(PlaceOrderDTO orderDetails);


	public List<OrderDTO> getAll(int pageNumber, int pageSize);	
	public OrderDTO getById(Long orderId);
	public List<OrderDTO> getAllByWorkerId(Long workerId);
	public List<OrderDTO> getAllByCustomerId(Long customerId);
	
}
