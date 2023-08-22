package com.shramsevak.shramSevak.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {

	@Column(length = 50, nullable = false)
	private String firstName;

	@Column(length = 50, nullable = false)
	private String lastName;

	@Column(length = 100, nullable = false, unique = true)
	private String email;

	@Column(length = 20, nullable = false)
	private String password;

	@Column(nullable = false, length = 10)
	private String contact;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 10)
	private Gender gender;

	@Column(nullable = false)
    @ColumnDefault("'images/customers/customerDefaultImage.jpg'")
	private String profilePicturePath;

	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private CustomerStatus status;
	
	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders = new ArrayList<>();
	
	// HELPER-METHODS
	
	// Order Helpers
	public void addOrder(Order order) {
		orders.add(order);
		order.setCustomer(this);
	}
	
	public void removeOrder(Order order) {
		orders.remove(order);
		order.setCustomer(null);
	}

}
