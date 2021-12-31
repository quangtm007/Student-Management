package com.ait.manager.service.user;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ait.manager.model.User;
import com.ait.manager.model.UserPrinciple;
import com.ait.manager.repository.UserRepository;
import com.ait.manager.security.UserPrincipal;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User createUser(User user) {
		return userRepository.saveAndFlush(user);
	}

	@Override
	public UserPrincipal findByUsername(String username) {
		User user = userRepository.findByUsername(username);
		UserPrincipal userPrincipal = new UserPrincipal();
		if (null != user) {
			Set<String> authorities = new HashSet<>();
			if (user.getRole() != null) {
				authorities.add(user.getRole().getCode());
			}

			userPrincipal.setUserId(user.getId());
			userPrincipal.setUsername(user.getUsername());
			userPrincipal.setPassword(user.getPassword());
			userPrincipal.setAuthorities(authorities);
		}
		return userPrincipal;
	}

	@Override
	public boolean isContainUsername(String username) {
		Iterable<User> users = userRepository.findAll();
		for (User u : users) {
			if (Objects.equals(u.getUsername(), username))
				return false;
		}
		return true;
	}

	@Override
	public Iterable<User> findAllByDeletedFalse() {
		return userRepository.findAllByDeletedFalse();
	}

	@Override
	public Iterable<User> findAllByDeletedTrue() {
		return userRepository.findAllByDeletedTrue();
	}

//    @Override
//    public Optional<User> findUserById(Long id){
//        return userRepository.findById(id);
//    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(username));
		if (!userOptional.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		return UserPrinciple.build(userOptional.get());
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public User findByName(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public void remove(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public Iterable<User> findByUserRoleStaff(Long id) {
		return userRepository.findByUserRoleStaff(id);
	}

	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}
}
