package com.ait.manager.service.postdetail;

import java.util.List;
import java.util.Optional;

import com.ait.manager.model.dto.CustomDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ait.manager.model.PostDetail;
import com.ait.manager.repository.PostDetailRepository;
@Service
public class PostDetailServiceImpl implements PostDetailService{
	@Autowired
	private PostDetailRepository postDetailRepository;
	
	@Override
	public Iterable<PostDetail> findAll() {
		// TODO Auto-generated method stub
		return postDetailRepository.findAll();
	}

	@Override
	public Optional<PostDetail> findById(Long id) {
		// TODO Auto-generated method stub
		return postDetailRepository.findById(id);
	}

	@Override
	public PostDetail save(PostDetail t) {

		return postDetailRepository.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		postDetailRepository.deleteById(id);
	}

	@Override
	public void deleteFindByCommentId(Long id) {
		// TODO Auto-generated method stub
		postDetailRepository.deleteFindByCommentId(id);
	}

	@Override
	public void deleteFindByPostId(Long id) {
		postDetailRepository.deleteFindByPostId(id);
	}

	@Override
	public void deleteFindByCommentIdAndPostId(Long cmt_id, Long post_id) {
		// TODO Auto-generated method stub
		postDetailRepository.deleteFindByCommentIdAndPostId(cmt_id, post_id);
	}

	@Override
	public List<Long> listFactorialId(Long id) {
		return postDetailRepository.listFactorialId(id);
	}

	@Override
	public void insertPostDetail(PostDetail postDetail) {
		List<Long> list = postDetailRepository.listFactorialId(postDetail.getPost_id());
		if(list.size() == 0){
			save(postDetail);
			return;
		}
		if(list.contains(postDetail.getFactorial_id())){
			return;
		}
		save(postDetail);
 	}

	@Override
	public int countFactorial(Long factorial_id, Long user_id) {
		return postDetailRepository.countFactorial(factorial_id,user_id);
	}

	@Override
	public int totalFactorial(Long user_id) {
		return postDetailRepository.totalFactorial(user_id);
	}

	@Override
	public int countFactorialByClass(Long factorial_id, Long user_id, Long class_id) {
		return postDetailRepository.countFactorialByClass(factorial_id,user_id,class_id);
	}

	@Override
	public Iterable<CustomDTO> listSearchByClass(Long class_id, String factorial_name, Long user_id) {
		return postDetailRepository.listSearchByClass(class_id, factorial_name, user_id);
	}

	@Override
	public Iterable<CustomDTO> listSearchByHashtagAndUser(String factorial_name, Long user_id) {
		return postDetailRepository.listSearchByHashtagAndUser(factorial_name,user_id);
	}
}
