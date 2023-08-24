package com.shramsevak.shramSevak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shramsevak.shramSevak.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
