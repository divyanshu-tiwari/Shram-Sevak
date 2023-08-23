package com.shramsevak.shramSevak.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name ="customers")
public class Customer extends BaseEntity {


@Column(length = 32 ,nullable=false)
private String firstName;

@Column(length = 32 ,nullable=false)
private String lastName;

@Column(length = 32 ,nullable=false ,unique = true)
private String email;

@Column(length = 32 ,nullable=false)
private String password;

//Number validation required either FrontEnd Or BackEnd
@Column(nullable=false )
private int contact;

@Enumerated(EnumType.STRING)
@Column(nullable=false)
private Gender gender;

@Column(nullable=false)
private String profilePicherPath;


private boolean isActive;  

}
