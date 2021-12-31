package com.ait.manager.data;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

public class NativeQueryResultsMapper {

	public static <T> List<T> map(List<Object[]> objectArrayList, Class<T> genericType) {
		List<T> ret = new ArrayList<T>();
		List<Field> mappingFields = getNativeQueryResultColumnAnnotatedFields(genericType);
		try {
			for (Object[] objectArr : objectArrayList) {
				T t = genericType.newInstance();
				for (int i = 0; i < objectArr.length; i++) {
					Field field = mappingFields.get(i);
					Object value = objectArr[i];
					BeanUtils.setProperty(t, field.getName(), value);
				}
				ret.add(t);
			}
		} catch (InstantiationException ie) {
			ie.printStackTrace();
			ret.clear();
		} catch (IllegalAccessException iae) {
			iae.printStackTrace();
			ret.clear();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			ret.clear();
		}
		return ret;
	}

	private static <T> List<Field> getNativeQueryResultColumnAnnotatedFields(Class<T> genericType) {
		Field[] fields = genericType.getDeclaredFields();
		List<Field> orderedFields = Arrays.asList(new Field[fields.length]);
		for (int i = 0; i < fields.length; i++) {
			if (fields[i].isAnnotationPresent(NativeQueryResultColumn.class)) {
				NativeQueryResultColumn nqrc = fields[i].getAnnotation(NativeQueryResultColumn.class);
				orderedFields.set(nqrc.index(), fields[i]);
			}
		}
		return orderedFields;
	}
}
