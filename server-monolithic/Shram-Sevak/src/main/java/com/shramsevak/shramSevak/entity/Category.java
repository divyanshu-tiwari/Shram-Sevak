package com.shramsevak.shramSevak.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SecondaryRow;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories")
@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Category extends BaseEntity {

    
    @Column(nullable = false)
    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Skill> skills = new ArrayList<>();

    
}