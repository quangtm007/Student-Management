package com.ait.manager.service.classes;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ait.manager.model.Class;
import com.ait.manager.repository.ClassRepository;
@Service
public class ClassServiceImpl implements ClassService{
	@Autowired
	private ClassRepository classRepository;

	@Override
	public Iterable<Class> findAll() {
		// TODO Auto-generated method stub
		return classRepository.findAll();
	}

	@Override
	public Optional<Class> findById(Long id) {
		// TODO Auto-generated method stub
		return classRepository.findById(id);
	}

	@Override
	public Class save(Class t) {
		// TODO Auto-generated method stub
		return classRepository.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		classRepository.deleteById(id);
	}

}
