package com.ait.manager.service.notification;

import com.ait.manager.model.Notification;
import com.ait.manager.service.GeneralService;

import java.util.List;

public interface NotificationService extends GeneralService<Notification>{
	Iterable<Notification> listCommentByPostIdAndUserId(Long post_id, Long user_id);

	void insertEntity(Notification notification);
	
	void deleteByCommentId(Long id);

	void deleteByPostId(Long id);
}
