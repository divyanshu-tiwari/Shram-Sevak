package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CreateOrderDTO;
import com.shramsevak.shramSevak.dto.OrderDTO;
import com.shramsevak.shramSevak.dto.TransactionUpdateRequestDTO;

public interface OrderService {
	
	public List<OrderDTO> getAll(int pageNumber, int pageSize);	
	public OrderDTO getById(Long orderId);
	public List<OrderDTO> getAllByWorkerId(Long workerId);
	public List<OrderDTO> getAllByCustomerId(Long customerId);
	
	public OrderDTO createOrder(CreateOrderDTO orderDetails);
	public ApiResponse fulfillOrder(Long orderId);
	public ApiResponse cancelOrder(Long orderId);
	public ApiResponse suspendOrder(Long orderId);
	
	public ApiResponse updateTransaction(TransactionUpdateRequestDTO updateRequest);
}
