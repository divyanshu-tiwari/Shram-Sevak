package com.shramsevek.customerEntity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name ="customers")
public class Customer {

@Column(length = 36)
private int customerId;

@Column(length = 36 ,nullable=false)
private String firstName;

@Column(length = 36 ,nullable=false)
private String lastName;

@Column(length = 36 ,nullable=false)
private String email;

@Column(length = 36 ,nullable=false)
private String password;

@Column(length = 128 ,nullable=false)
private int contact;

@Enumerated(EnumType.STRING)
@Column(length = 16 ,nullable=false)
private Gender gender;

@Column(length = 8)
private boolean isActive;  

}
