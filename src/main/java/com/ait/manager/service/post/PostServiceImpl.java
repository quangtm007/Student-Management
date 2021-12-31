package com.ait.manager.service.post;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ait.manager.model.Post;
import com.ait.manager.model.Status;
import com.ait.manager.model.dto.PostDTO;
import com.ait.manager.model.dto.SearchDTO;
import com.ait.manager.model.dto.StudentDTO;
import com.ait.manager.repository.PostRepository;
import com.ait.manager.repository.PostRepositoryCustom;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostRepositoryCustom postRepositoryCustom;

	@Override
	public Iterable<Post> findAll() {

		return postRepository.findAll();
	}

	@Override
	public Optional<Post> findById(Long id) {

		return postRepository.findById(id);

	}

	@Override
	public Post save(Post t) {
		return postRepository.save(t);
	}

	@Override
	public void remove(Long id) {
		// TODO Auto-generated method stub
		postRepository.deleteById(id);
	}

	@Override
	public Iterable<PostDTO> allListPost() {
		// TODO Auto-generated method stub
		return postRepository.allListPost();
	}

	@Override
	public Iterable<PostDTO> allListByHashtag(String factorials) {
		// TODO Auto-generated method stub
		return postRepository.allListByHashtag(factorials);
	}

	@Override
	public Iterable<StudentDTO> listStudentDetail(Long id) {
		// TODO Auto-generated method stub
		return postRepository.listStudentDetail(id);
	}

	@Override
	public void changeStatus(Long id) {
		// TODO Auto-generated method stub
		postRepository.changeStatus(id);
	}

	@Override
	public Optional<StudentDTO> studentFindPostById(Long id) {
		// TODO Auto-generated method stub
		return postRepository.studentFindPostById(id);
	}

	@Override
	public Iterable<PostDTO> AllStudentByParentID(Long id) {
		// TODO Auto-generated method stub
		return postRepository.AllStudentByParentID(id);
	}

	@Override
	public Optional<Post> postDetail(Long id) {
		// TODO Auto-generated method stub
		return postRepository.postDetail(id);
	}

	public Iterable<SearchDTO> searchEvents(long userId, long eventId, long classId, Status status, Status status2, Status status3) {
		return postRepositoryCustom.searchEvent(userId, eventId, classId, status, status2 , status3);
	}

	@Override
	public void changeStatusCommentExist(Long id) {
		// TODO Auto-generated method stub
		postRepository.changeStatusCommentExist(id);
	}
}
