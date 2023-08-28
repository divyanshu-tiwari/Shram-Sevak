package com.shramsevak.shramSevak.entity;



import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "workers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
public class Worker extends BaseEntity {
   
    @Column(name = "first_name" ,nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name" ,nullable = false, length = 50)
    private String lastName;

    @Column(name = "gender" ,nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "contact" , nullable = false, unique = true, length = 10)
    private String contact;

    @Column(name = "email" ,nullable = true, unique = true, length = 100)
    private String email;

    @Column(name = "password" ,nullable = false, length = 20)
    private String password;
    
    @Column(nullable = true)
    @ColumnDefault("'images/workers/workerDefaultImage.png'")
    private String profilePicturePath;

    @Column(name = "status" ,nullable = false)
    @Enumerated(EnumType.STRING)
    private WorkerStatus status;

    // RELATIONS
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "worker_skills",
               joinColumns = @JoinColumn(name = "worker_id"),
               inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private Set<Skill> skills = new HashSet<>();
    
    @ManyToOne
    @JoinColumn(name = "locality_id")
    private Locality locality;
    
    @OneToMany(mappedBy = "worker", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> acceptedOrders = new ArrayList<>();
  
    
    // HELPER-METHODS
    
    // Skill Helpers
    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.getWorkers().add(this);
    }
   
    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.getWorkers().remove(this);
    }
    
    // Order Helpers
    public void addOrder(Order order) {
    	acceptedOrders.add(order);
    	order.setWorker(this);
    }
    
    public void removeOrder(Order order) {
    	acceptedOrders.remove(order);
    	order.setWorker(null);
    }
    
   

}