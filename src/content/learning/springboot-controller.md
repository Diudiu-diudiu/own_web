---
title: "理解 Spring Boot Controller"
date: 2026-09-25
category: "Spring Boot"
tags: ["Spring Boot", "REST API", "Java"]
public: true
status: "learning"
description: "一次请求如何找到正确的方法，以及 Controller 应该负责什么。"
---

Controller 是 Web 请求进入应用程序后的第一站，但它不应该承担所有工作。

## 一条清晰的边界

- Controller：接收请求、校验输入、组织响应
- Service：处理业务逻辑
- Repository / Mapper：访问数据

把职责分开之后，代码更容易测试，出问题时也更容易定位。
