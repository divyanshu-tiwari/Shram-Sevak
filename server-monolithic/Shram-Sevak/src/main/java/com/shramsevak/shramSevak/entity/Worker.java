package com.shramsevak.shramSevak.entity;



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
    
    @Column(nullable = false)
    @ColumnDefault("'images/workers/workerDefaultImage.jpg'")
    private String profilePicturePath;
    
    public int hashCode() {
        
        return (this.getId() == null) ? 0 :this.getId().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Worker other = (Worker) obj;
        return this.getId() != null && this.getId().equals(other.getId());
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