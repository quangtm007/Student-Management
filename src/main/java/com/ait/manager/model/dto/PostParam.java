package com.ait.manager.model.dto;

import com.ait.manager.model.Event;
import com.ait.manager.model.Post;


public class PostParam {
	private long id;
	private Long eventId;
	private String workCompleted;
	private String action;
	private String power;
	private String capacity;
	private String think;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getWorkCompleted() {
		return workCompleted;
	}

	public void setWorkCompleted(String workCompleted) {
		this.workCompleted = workCompleted;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getPower() {
		return power;
	}

	public void setPower(String power) {
		this.power = power;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

	public String getThink() {
		return think;
	}

	public void setThink(String think) {
		this.think = think;
	}

	public void update(Post p) {
		// No da update tat ca du lieu can thiet cho Post
		p.setThink(think);
		p.setWork_completed(workCompleted);
		p.setAction(action);
		p.setPower(power);
		p.setCapacity(capacity);
		p.setThink(think);
		p.setEvent(new Event(eventId));
	}
}
