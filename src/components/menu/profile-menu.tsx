"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { ButtonSize } from "../buttons/button";
import { useIsLoggedIn } from "@/common/hooks/isloggedin";
import OutlinedButton from "../buttons/outlined-button";
import { APP_TYPE } from "@/common/constants/constants";
import UserAvatar, { ImageSize } from "../label/user-avatar";
import { UserModel } from "@/types/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/auth-slice";
import { getUserLocal } from "@/common/utils/cookie-manager";
import { useIsMobileSize } from "@/common/hooks/device-type";
import dynamic from "next/dynamic";
import { FiX } from "react-icons/fi";
import { useWindowSize } from "@/common/hooks/resize-window";
import BasicModal from "../modal/basic-modal";

export default function NavProfileMenu({ appType }: { appType: number }) {
  const isLoggedIn = useIsLoggedIn();
  const isMobile = useIsMobileSize();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserModel | null>(null);
  const [showMenuModal, setShowMenuModal] = useState(false);

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

  if (isMobile)
    return (
      <>
        <BasicModal
          isShow={showMenuModal}
          onHide={() => {
            setShowMenuModal(false);
          }}
          title="حساب کاربری"
          onPressClose={() => {
            setShowMenuModal(false);
          }}
        >
          <section className="flex flex-row  items-center px-4 mt-2">
            <UserAvatar name={user?.fullname} imageSize={ImageSize.large} />
            <div className="flex flex-col items-center justify-center">
              {user?.fullname && (
                <p className="text-neutral-11-light font-medium text-2xl">{user?.fullname}</p>
              )}
              <p className="text-neutral-9-light text-xl">{user?.phoneNumber}</p>
            </div>
          </section>
          <p className="text-neutral-9-light text-sm mt-2">{user?.clinicName}</p>
          {appType == APP_TYPE.oda && (
            <>
              <div className="divider custom-divider bg-neutral-4-light my-2" />
              <OutlinedButton>لیست قیمت</OutlinedButton>
              <OutlinedButton>کلینیک</OutlinedButton>
              <div className="divider custom-divider bg-neutral-4-light my-2" />
            </>
          )}

          <OutlinedButton
            className="!border-error-light !text-error-light mt-8"
            onClick={onPressLogout}
          >
            خروج
          </OutlinedButton>
        </BasicModal>

        <OutlinedButton
          buttonSize={ButtonSize.large}
          onClick={() => {
            setShowMenuModal(true);
          }}
        >
          <FiUser className="size-5 text-primary font-medium" />
        </OutlinedButton>
      </>
    );

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
              <section className="flex flex-row  items-center">
                <UserAvatar name={user?.fullname} />
                <div className="flex flex-col items-center justify-center">
                  {user?.fullname && (
                    <p className="text-neutral-11-light font-medium text-base">{user?.fullname}</p>
                  )}
                  <p className="text-neutral-9-light text-sm">{user?.phoneNumber}</p>
                </div>
              </section>
              <p className="text-neutral-9-light text-sm mt-2">{user?.clinicName}</p>
              {appType == APP_TYPE.oda && (
                <>
                  <div className="divider custom-divider bg-neutral-4-light my-2" />
                  <OutlinedButton>لیست قیمت</OutlinedButton>
                  <OutlinedButton>کلینیک</OutlinedButton>
                  <div className="divider custom-divider bg-neutral-4-light my-2" />
                </>
              )}

              <OutlinedButton
                className="!border-error-light !text-error-light mt-2"
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
