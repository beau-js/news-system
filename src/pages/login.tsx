/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-04 12:53:21
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-11 19:05:25
 * @FilePath: \workspace\news-system\src\pages\login.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "../styles/login.module.css";
import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import options from "../../public/assets/particles.json";
import { useRouter } from "next/router";

const login: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // await console.log(container);
    },
    []
  );

  const router = useRouter();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const fetchAllData = async () => {
      const usersResponst = await fetch(
        "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      );
      const usersData = await usersResponst.json();

      const userData = usersData.find((user: any) => {
        return (
          user.roleState &&
          user.username === values.username &&
          user.password === values.password
        );
      });
      console.log(userData);

      if (userData) {
        const rolesResponse = await fetch(
          "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/roles.json"
        );
        const rolesData = await rolesResponse.json();
        const roleData = rolesData.find((role: any) => {
          return role.id === userData.roleId;
        });
        console.log({ ...roleData, ...userData });

        localStorage.setItem(
          "token",
          JSON.stringify({ ...roleData, ...userData })
        );

        router.push("/");
      } else {
        console.log("登录失败");
      }
    };
    fetchAllData();
  };

  return (
    <div className={styles.loginContainer}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />

      <div
        className={styles.fromContainer}
        // id="particle-background"
      >
        <div style={{ marginBottom: "1rem" }}>全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>
                <span style={{ color: "white" }}>Remember me</span>
              </Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href=""
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
            >
              Log in
            </Button>
            <span style={{ color: "white" }}>
              Or{" "}
              <a
                href=""
                style={{ marginLeft: "0.5rem" }}
              >
                register now!
              </a>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default login;
