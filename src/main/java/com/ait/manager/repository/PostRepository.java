package com.ait.manager.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ait.manager.model.Post;
import com.ait.manager.model.dto.PostDTO;
import com.ait.manager.model.dto.StudentDTO;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM list_all_student")
	Iterable<PostDTO> allListPost();

	@Query(nativeQuery = true, value = "call getAllStudentByParentID(?)")
	Iterable<PostDTO> AllStudentByParentID(Long id);

	@Query(nativeQuery = true, value = "SELECT * FROM post_list where factorial_hashtag like (%?%)")
	Iterable<PostDTO> allListByHashtag(String factorials);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "update posts p set p.status = 2 where p.post_id = ?")
	void changeStatus(Long id);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "update posts p set p.status = 1 where p.post_id = ?")
	void changeStatusCommentExist(Long id);

	@Query(nativeQuery = true, value = "SELECT p.post_id as post_id, c.class_name as class_name, e.event_icon as event_icon, e.event_name as event_name, p.status as status FROM posts p \r\n"
			+ "inner join events e on p.event_id = e.event_id\r\n" + "inner join users u on p.user_id = u.id\r\n"
			+ "inner join user_class_post ucp on ucp.post_id = p.post_id\r\n"
			+ "inner join classes c on ucp.class_id = c.class_id\r\n" + "where p.post_id = ?\r\n"
			+ "order by c.class_id desc, e.event_id desc;")
	Optional<StudentDTO> studentFindPostById(Long id);

	@Query(nativeQuery = true, value = "select * from posts where post_id = ?")
	Optional<Post> postDetail(Long id);

	@Query(nativeQuery = true, value = "SELECT p.post_id as post_id, c.class_name as class_name, e.event_name as event_name, e.event_icon, p.status as status FROM posts p \r\n"
			+ "inner join events e on p.event_id = e.event_id \r\n" + "inner join users u on p.user_id = u.id\r\n"
			+ "inner join user_class_post ucp on ucp.post_id = p.post_id\r\n"
			+ "inner join classes c on ucp.class_id = c.class_id\r\n" + "where u.id = ?\r\n"
			+ "order by c.class_id desc , p.post_id desc ")
	Iterable<StudentDTO> listStudentDetail(Long id);
}
