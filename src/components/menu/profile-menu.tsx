"use client";
import React, { useEffect, useRef, useState } from "react";
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
import BasicModal, { IRefBasicModal } from "../modal/basic-modal";

export default function NavProfileMenu({ appType }: { appType: number }) {
  const isLoggedIn = useIsLoggedIn();
  const isMobile = useIsMobileSize();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserModel | null>(null);
  const categoryRef = useRef<IRefBasicModal>(null);

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
        <BasicModal ref={categoryRef} size="full" title="حساب کاربری">
          <div className="flex flex-col gap-y-4 px-4">
            <section className="flex flex-row  items-center mt-2">
              <UserAvatar name={user?.fullname} imageSize={ImageSize.large} />
              <div className="flex flex-col items-center justify-center">
                {user?.fullname && (
                  <p className="text-neutral-11-light font-medium text-2xl">{user?.fullname}</p>
                )}
                <p className="text-neutral-9-light text-xl">{user?.phoneNumber}</p>
              </div>
            </section>
            <p className="text-neutral-9-light text-xl mt-2">{user?.clinicName}</p>
            {appType == APP_TYPE.oda && (
              <>
                <div className="divider custom-divider bg-neutral-4-light my-2" />
                <OutlinedButton key={"pricelist-btn"} buttonSize={ButtonSize.large}>
                  لیست قیمت
                </OutlinedButton>
                <OutlinedButton key={"clinic-btn"} buttonSize={ButtonSize.large}>
                  کلینیک
                </OutlinedButton>
                <div className="divider custom-divider bg-neutral-4-light my-2" />
              </>
            )}

            <OutlinedButton
              className="!border-error-light !text-error-light"
              buttonSize={ButtonSize.large}
              onClick={onPressLogout}
            >
              خروج
            </OutlinedButton>
          </div>
        </BasicModal>

        <OutlinedButton
          buttonSize={ButtonSize.large}
          onClick={() => {
            categoryRef.current?.openModal();
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
