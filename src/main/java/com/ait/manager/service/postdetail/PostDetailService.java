package com.ait.manager.service.postdetail;

import java.util.List;
import java.util.Optional;

import com.ait.manager.model.PostDetail;
import com.ait.manager.model.dto.CustomDTO;
import com.ait.manager.service.GeneralService;

public interface PostDetailService extends GeneralService<PostDetail>{
	void deleteFindByCommentId(Long id);
	void deleteFindByPostId(Long id);
	void deleteFindByCommentIdAndPostId(Long cmt_id, Long post_id);
	List<Long> listFactorialId(Long id);
	void insertPostDetail(PostDetail postDetail);
	int countFactorial(Long factorial_id, Long user_id);
	int totalFactorial(Long user_id);
	int countFactorialByClass(Long factorial_id, Long user_id, Long class_id);
	Iterable<CustomDTO> listSearchByClass(Long class_id, String factorial_name, Long user_id);
	Iterable<CustomDTO> listSearchByHashtagAndUser(String factorial_name, Long user_id);
}
