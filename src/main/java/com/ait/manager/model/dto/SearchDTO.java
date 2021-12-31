package com.ait.manager.model.dto;

import com.ait.manager.data.NativeQueryResultColumn;
import com.ait.manager.data.NativeQueryResultEntity;
import com.ait.manager.model.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;

@NativeQueryResultEntity
public class SearchDTO {

	@NativeQueryResultColumn(index = 0)
	private Long postId;

	@NativeQueryResultColumn(index = 1)
	private Long eventId;

	@NativeQueryResultColumn(index = 2)
	private String eventName;

	@NativeQueryResultColumn(index = 3)
	private Long classId;

	@NativeQueryResultColumn(index = 4)
	private String className;

	@NativeQueryResultColumn(index = 5)
	private Integer _status;


	@NativeQueryResultColumn(index = 6)
	private String eventIcon;

	@NativeQueryResultColumn(index = 7)
	private long userId;

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getEventIcon() {
		return eventIcon;
	}

	public void setEventIcon(String eventIcon) {
		this.eventIcon = eventIcon;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public Long getClassId() {
		return classId;
	}

	public void setClassId(Long classId) {
		this.classId = classId;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	@JsonIgnore
	public Integer get_status() {
		return _status;
	}

	public void set_status(Integer _status) {
		this._status = _status;
	}

	public Status getStatus() {
		if (this._status != null) {
			int sts = (int)_status;
			switch (sts) {
				case 0:
					return Status.未確認;
				case 1:
					return Status.確認中;
				case 2:
					return Status.修了;
				default:
					throw new IllegalArgumentException("Ivalid Status value");
			}
		}
		return null;
	}
}