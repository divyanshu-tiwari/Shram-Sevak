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

@Column(length = 36)
private String firstName;

@Column(length = 36)
private String lastName;

@Column(length = 36)
private String email;

@Column(length = 36)
private String password;

@Column(length = 128)
private int contact;

@Enumerated(EnumType.STRING)
@Column(length = 16)
private Gender gender;

@Column(length = 8)
private boolean isActive;  

}
