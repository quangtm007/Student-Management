package com.ait.manager.service.factorial;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ait.manager.model.Factorial;
import com.ait.manager.repository.FactorialRepository;

@Service
public class FactorialServiceImpl implements FactorialService{
	@Autowired
	FactorialRepository factorialRepository;

	@Override
	public Iterable<Factorial> findAll() {
		// TODO Auto-generated method stub
		return factorialRepository.findAll();
	}

	@Override
	public Optional<Factorial> findById(Long id) {
		// TODO Auto-generated method stub
		return factorialRepository.findById(id);
	}

	@Override
	public Factorial save(Factorial t) {
		// TODO Auto-generated method stub
		return factorialRepository.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		factorialRepository.deleteById(id);
	}

	@Override
	public Optional<Factorial> findByFactorialHashtag(String factorial_hashtag) {
		// TODO Auto-generated method stub
		return factorialRepository.findByFactorialHashtag(factorial_hashtag);
	}

}
