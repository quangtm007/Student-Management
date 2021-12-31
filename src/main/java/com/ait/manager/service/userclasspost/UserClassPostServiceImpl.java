package com.ait.manager.service.userclasspost;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ait.manager.model.UserClassPost;
import com.ait.manager.repository.UserClassPostRepository;

@Service
public class UserClassPostServiceImpl implements UserClassPostService{

	@Autowired
	public UserClassPostRepository userClassPostRepository;
	
	
	@Override
	public Iterable<UserClassPost> findAll() {
		// TODO Auto-generated method stub
		return userClassPostRepository.findAll();
	}

	@Override
	public Optional<UserClassPost> findById(Long id) {
		// TODO Auto-generated method stub
		return userClassPostRepository.findById(id);
	}

	@Override
	public UserClassPost save(UserClassPost t) {
		// TODO Auto-generated method stub
		return userClassPostRepository.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		userClassPostRepository.deleteById(id);
	}


	@Override
	public void deleteFindByPostId(Long id) {
		userClassPostRepository.deleteFindByPostId(id);
	}
}
