package com.shramsevak.shramSevak.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shramsevak.shramSevak.entity.Skill;
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

	List<Skill> findByCategoryId(Long categoryId);

}
