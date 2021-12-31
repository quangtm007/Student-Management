package com.ait.manager.service.factorial;

import java.util.Optional;

import com.ait.manager.model.Factorial;
import com.ait.manager.service.GeneralService;

public interface FactorialService extends GeneralService<Factorial>{
	Optional<Factorial> findByFactorialHashtag(String factorial_hashtag);
}
