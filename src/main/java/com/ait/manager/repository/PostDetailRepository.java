package com.ait.manager.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.ait.manager.model.dto.CustomDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ait.manager.model.PostDetail;

@Repository
public interface PostDetailRepository extends JpaRepository<PostDetail, Long> {
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM post_detail WHERE cmt_id = ?")
	void deleteFindByCommentId(Long id);

	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM post_detail WHERE post_id = ?")
	void deleteFindByPostId(Long id);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "DELETE FROM post_detail WHERE cmt_id = ?1 and post_id = ?2")
	void deleteFindByCommentIdAndPostId(Long cmt_id, Long post_id);

	@Query(nativeQuery = true, value = "SELECT factorial_id FROM post_detail where post_id = ? order by factorial_id asc")
	List<Long> listFactorialId(Long id);

	@Query(nativeQuery = true,value = "select count(pd.factorial_id) as count from post_detail pd\n" +
			"inner join posts p on pd.post_id = p.post_id \n" +
			"where pd.factorial_id = ? and p.user_id = ?")
	int countFactorial(Long factorial_id, Long user_id);

	@Query(nativeQuery = true, value = "select count(pd.factorial_id) as count from post_detail pd\n" +
			"inner join posts p on pd.post_id = p.post_id \n" +
			"where p.user_id = ?")
	int totalFactorial(Long user_id);

	@Query(nativeQuery = true, value = "select count(pd.factorial_id) as count from post_detail pd\n" +
			"inner join posts p on pd.post_id = p.post_id \n" +
			"inner join user_class_post c on c.post_id = p.post_id\n" +
			"where pd.factorial_id = ? and p.user_id = ? and c.class_id = ?")
	int countFactorialByClass(Long factorial_id, Long user_id, Long class_id);

	@Query(nativeQuery = true,value = "SELECT p.post_id as post_id, e.event_name as event_name FROM post_detail pd \n" +
			"inner join posts p on pd.post_id = p.post_id\n" +
			"inner join factorials f on pd.factorial_id = f.factorial_id\n" +
			"inner join events e on p.event_id = e.event_id\n" +
			"inner join user_class_post ucl on ucl.post_id = p.post_id\n" +
			"inner join classes c on ucl.class_id = c.class_id\n" +
			"where ucl.class_id = ? and f.factorial_name = ? and p.user_id = ?\n" +
			"group by pd.post_id")
	Iterable<CustomDTO> listSearchByClass(Long class_id, String factorial_name, Long user_id);

	@Query(nativeQuery = true,value = "SELECT p.post_id as post_id, e.event_name as event_name FROM post_detail pd \n" +
			"inner join posts p on pd.post_id = p.post_id\n" +
			"inner join factorials f on pd.factorial_id = f.factorial_id\n" +
			"inner join events e on p.event_id = e.event_id\n" +
			"where f.factorial_name = ? and p.user_id = ?\n" +
			"group by pd.post_id order by post_id asc")
	Iterable<CustomDTO> listSearchByHashtagAndUser(String factorial_name, Long user_id);
}
