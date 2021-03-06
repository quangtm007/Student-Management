package com.ait.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ait.manager.model.Class;

@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {
}
