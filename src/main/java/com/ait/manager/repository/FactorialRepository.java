package com.ait.manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ait.manager.model.Factorial;
@Repository
public interface FactorialRepository extends JpaRepository<Factorial, Long>{
	@Query(nativeQuery = true, value = "SELECT * FROM factorials where factorial_name = ?")
	Optional<Factorial> findByFactorialHashtag(String factorial_hashtag);
}
