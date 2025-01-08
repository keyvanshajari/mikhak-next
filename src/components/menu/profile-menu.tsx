"use client";

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { ButtonSize } from "../buttons/button";
import { useIsLoggedIn } from "@/common/hooks/isloggedin";
import OutlinedButton from "../buttons/outlined-button";
import { useAppType } from "@/common/hooks/app-type";
import { APP_TYPE } from "@/common/constants/constants";
import UserAvatar from "../label/user-avatar";
import { UserModel } from "@/types/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/auth-slice";
import { getUserLocal } from "@/common/utils/cookie-manager";

export default function NavProfileMenu() {
  const isLoggedIn = useIsLoggedIn();
  const appType = useAppType();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const _user = await getUserLocal();
      setUser(_user);
    };
    fetchUser();
  }, []);

  const onPressLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="dropdown !z-50" dir="ltr">
          <OutlinedButton buttonSize={ButtonSize.large}>
            <FiUser className="size-5 text-primary font-medium" />
          </OutlinedButton>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact mt-2 bg-background-light border-[1px] text-primary-content z-[1000000] w-64 p-2 shadow"
          >
            <div className="card-body" dir="rtl">
              <div className="flex flex-row  items-center">
                <UserAvatar name={user?.fullname} />
                <div className="flex flex-col items-center justify-center">
                  {user?.fullname && (
                    <p className="text-neutral-11-light font-medium text-base">{user?.fullname}</p>
                  )}
                  <p className="text-neutral-9-light text-sm">{user?.phoneNumber}</p>
                </div>
              </div>
              <p className="text-neutral-9-light text-sm mt-2">{user?.clinicName}</p>
              {appType == APP_TYPE.oda && (
                <>
                  <div className="divider custom-divider bg-neutral-4-light my-2" />
                  <OutlinedButton>لیست قیمت</OutlinedButton>
                  <OutlinedButton>کلینیک</OutlinedButton>
                </>
              )}

              <div className="divider custom-divider bg-neutral-4-light my-2" />

              <OutlinedButton
                className="!border-error-light !text-error-light"
                onClick={onPressLogout}
              >
                خروج
              </OutlinedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
