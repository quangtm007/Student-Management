package com.ait.manager.repository.Imp;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ait.manager.data.NativeQueryResultsMapper;
import com.ait.manager.model.Status;
import com.ait.manager.model.dto.SearchDTO;
import com.ait.manager.repository.PostRepositoryCustom;

@Repository
@Transactional(readOnly = true)
public class PostRepositoryImp implements PostRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<SearchDTO> searchEvent(long userId, long eventId, long classId, Status status, Status status2,
									   Status status3) {

		String where = " where u.id=" + userId;

		if (classId > 0) {
			where += " and c.class_id=" + classId;
		}

		if (eventId > 0) {
			where += " and p.event_id=" + eventId;

		}

		if (status != null && status2 != null && status3 != null) {
			where += " and (p.status=" + status.ordinal() + " or p.status=" + status2.ordinal() + " or p.status="
					+ status3.ordinal() + ")";
		} else if (status != null && status2 != null) {
			where += " and (p.status=" + status.ordinal() + " or p.status=" + status2.ordinal() + ")";
		} else if (status2 != null && status3 != null) {
			where += " and (p.status=" + status2.ordinal() + " or p.status=" + status3.ordinal() + ")";
		} else if (status != null && status3 != null) {
			where += " and (p.status=" + status.ordinal() + " or p.status=" + status3.ordinal() + ")";
		} else {
			if (status != null) {

				where += " and p.status=" + status.ordinal();
			}
			if (status2 != null) {

				where += " and p.status=" + status2.ordinal();
			}
			if (status3 != null) {

				where += " and p.status=" + status3.ordinal();
			}

		}
		
		Query query = entityManager.createNativeQuery(
				"SELECT p.post_id as post_id, e.event_id, e.event_name, c.class_id, c.class_name, p.status, e.event_icon, u.id FROM posts p \n"
						+ "		inner join users u on p.user_id = u.id \n"
						+ "		inner join events e on e.event_id = p.event_id\n"
						+ "		JOIN `user_class_post` ucp ON p.post_id = ucp.post_id\n"
						+ "		JOIN `classes` c ON ucp.class_id = c.class_id" + where
						+ "	order by c.class_id desc , p.post_id desc");

		List<SearchDTO> rs = NativeQueryResultsMapper.map(query.getResultList(), SearchDTO.class);
		return rs;
	}
}
