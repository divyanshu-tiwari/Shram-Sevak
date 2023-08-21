package com.shramsevak.workerService.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="skills")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;
     
    @Column(nullable = false)
    private String skillTitle;

    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY)
    private Set<Worker> workers = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Override
    public int hashCode() {
       
        return (skillId == null) ? 0 : skillId.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Skill other = (Skill) obj;
        return skillId != null && skillId.equals(other.skillId);
    }

}
