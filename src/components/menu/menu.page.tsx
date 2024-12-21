'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import MenuForm from "../edit/menu/editMenu.page";
import { Menu } from "@/ultis/type/menu.type";
import { deleteMenu, getAllMenu } from "@/ultis/apis/menu.api";
import { DataGroupByType } from "@/ultis/type/commom.type";
import { useGlobalContext } from "@/contexts/global.context";
import LottieAnimation from "../loading/loadingForPage/loadingPage";
export interface MenuPageProps {
    translate: any
}
  
export const MenuPage: FC<MenuPageProps> = ({
    translate
}) => {

    const [menus, setMenus] = useState<DataGroupByType<Menu>[]>([]);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [menuChange, setMenuChange] = useState<Menu | null>(null);
    const [isDummy, setIsDummy] = useState<boolean>(false);
    const {handleShowMessage} = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const menuList = await getAllMenu() ?? [];
            setMenus(menuList);
            setIsLoading(false)
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const handleEditmenu = async (menu: Menu) => {
        setMenuChange(menu);
        setIsShowPopup(true);
    }

    const handleCreateNewmenu = async () => {
        setMenuChange(null);
        setIsShowPopup(true);
    }

    const closePopup = () => {
        setIsShowPopup(false);
    }

    const removeMenu = async (id: string) => {
        try {
            const result = await deleteMenu(id);
            handleShowMessage(1, 'Delete menu successfully');
            setIsDummy(!isDummy)
        } catch (error) {
            handleShowMessage(2, 'Delete menu failed');
        }
    }

    useEffect(() => {
        fetchData()
    }, [isDummy]);

    return (
        isLoading ? <LottieAnimation></LottieAnimation> :
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Menu</h2>
                <button className={styles.addItem} onClick={handleCreateNewmenu}>Add Item</button>
            </div>
            {
                menus.map(({type, items}, index) => {
                    return (
                        <div className={styles.menuTypeoContainer} key={index}>
                            <h3>{type}</h3>
                            <div className={styles.listContainer}>
                                {
                                    items.map((menu: Menu, index) => {
                                        return (
                                            <div className={styles.itemContainer} key={index}>
                                                <div className={styles.imageContainer}>
                                                    <Image className={styles.image} src={menu.thumbnail!} alt="" width={200} height={200} unoptimized></Image>
                                                </div>    
                                                <div className={styles.description}>
                                                    <p className={styles.name}>{menu.name}</p>
                                                    <div className={styles.priceContainer}>
                                                        <p className={styles.price}>{menu.price}$</p>
                                                        <button className={styles.editItem} onClick={() => handleEditmenu(menu)}>Edit</button>
                                                        <div className={styles.deleteBtn} onClick={() => removeMenu(menu.id!)}>
                                                            <Image src="/images/delete.png" alt="" width={20} height={20} unoptimized></Image>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.menuDescription}>
                                                    {menu.description}
                                                </div>
                                            </div> 
                                        )
                                    })}
                            </div> 
                        </div>
                    )
                })
            }
            {isShowPopup && <MenuForm menu={menuChange} setIsDummy={setIsDummy} isDummy={isDummy} callback={closePopup}></MenuForm>}
        </div>
    );
}