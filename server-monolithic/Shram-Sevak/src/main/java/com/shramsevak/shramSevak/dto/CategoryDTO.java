package com.shramsevak.shramSevak.dto;

import java.util.List;

import com.shramsevak.shramSevak.entity.Skill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryDTO {

    private Long id;
    private String categoryName;
}