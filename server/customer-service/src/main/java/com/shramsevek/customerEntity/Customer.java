package com.shramsevek.customerEntity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name ="customers")
public class Customer {

//Number validation required either FrontEnd Or BackEnd
@Id
private int customerId;

@Column(length = 36 ,nullable=false)
private String firstName;

@Column(length = 36 ,nullable=false)
private String lastName;

@Column(length = 36 ,nullable=false)
private String email;

@Column(length = 36 ,nullable=false)
private String password;

@Column(nullable=false)
private int contact;

@Enumerated(EnumType.STRING)
@Column(nullable=false)
private Gender gender;

private boolean isActive;  

}
