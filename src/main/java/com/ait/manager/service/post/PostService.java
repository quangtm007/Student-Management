package com.ait.manager.service.post;

import java.util.Optional;

import com.ait.manager.model.Post;
import com.ait.manager.model.Status;
import com.ait.manager.model.dto.PostDTO;
import com.ait.manager.model.dto.SearchDTO;
import com.ait.manager.model.dto.StudentDTO;
import com.ait.manager.service.GeneralService;

public interface PostService extends GeneralService<Post> {
	Iterable<PostDTO> allListPost();

	Iterable<PostDTO> AllStudentByParentID(Long id);

	Iterable<PostDTO> allListByHashtag(String factorials);

	Iterable<StudentDTO> listStudentDetail(Long id);

	void changeStatus(Long id);

	void changeStatusCommentExist(Long id);

	Optional<StudentDTO> studentFindPostById(Long id);

	Optional<Post> postDetail(Long id);
	
	Iterable<SearchDTO> searchEvents(long userId, long eventId, long classId, Status status, Status status2, Status status3);
}
