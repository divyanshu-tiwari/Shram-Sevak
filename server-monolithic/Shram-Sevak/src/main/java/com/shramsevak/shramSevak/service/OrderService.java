package com.shramsevak.shramSevak.service;

import java.util.List;

import com.shramsevak.shramSevak.dto.ApiResponse;
import com.shramsevak.shramSevak.dto.CreateOrderDTO;
import com.shramsevak.shramSevak.dto.OrderResponseDTO;
import com.shramsevak.shramSevak.dto.TransactionUpdateRequestDTO;

public interface OrderService {
	
	public List<OrderResponseDTO> getAll(int pageNumber, int pageSize);	
	public OrderResponseDTO getById(Long orderId);
	public List<OrderResponseDTO> getAllByWorkerId(Long workerId);
	public List<OrderResponseDTO> getAllByCustomerId(Long customerId);
	
	public OrderResponseDTO createOrder(CreateOrderDTO orderDetails);
	public ApiResponse fulfillOrder(Long orderId);
	public ApiResponse cancelOrder(Long orderId);
	public ApiResponse suspendOrder(Long orderId);
	
	public ApiResponse updateTransaction(TransactionUpdateRequestDTO updateRequest);
}
