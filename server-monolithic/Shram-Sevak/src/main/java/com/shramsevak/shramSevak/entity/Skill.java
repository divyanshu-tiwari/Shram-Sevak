package com.shramsevak.shramSevak.entity;


import java.util.HashSet;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class Skill extends BaseEntity {
    
	@Column(name = "skill_name", nullable = false, length = 50)
    private String skillName;

    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Worker> workers = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // commented as equals and hashCode provided by the base entity
	/*
	 * @Override public int hashCode() { return (this.getId() == null) ? 0 :
	 * this.getId().hashCode(); }
	 * 
	 * @Override public boolean equals(Object obj) { if (this == obj) return true;
	 * if (obj == null || getClass() != obj.getClass()) return false; Skill other =
	 * (Skill) obj; return this.getId() != null &&
	 * this.getId().equals(other.getId()); }
	 */

}