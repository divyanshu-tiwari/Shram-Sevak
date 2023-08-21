package com.shramsevak.workerService.entity;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_id",nullable = false)
    private Long workerId;

    @Column(name = "first_name" ,nullable = false)
    private String firstName;

    @Column(name = "last_name" ,nullable = false)
    private String lastName;

    @Column(name = "gender" ,nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "contact" ,nullable = false)
    private String contact;

    //nullable true
    @Column(name = "email" ,nullable = true,unique = true)
    private String email;

    @Column(name = "password" ,nullable = false)
    private String password;

    @Column(name = "status" ,nullable = false)
    @Enumerated(EnumType.STRING)
    private WorkerStatus status;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "worker_skill",
               joinColumns = @JoinColumn(name = "worker_id"),
               inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private Set<Skill> skills;
    
    @Column(nullable = true)
    private long workLocationId;
    
    public int hashCode() {
        
        return (workerId == null) ? 0 : workerId.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Worker other = (Worker) obj;
        return workerId != null && workerId.equals(other.workerId);
    }
    
    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.getWorkers().add(this);
    }
   
    
    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.getWorkers().remove(this);
    }

}