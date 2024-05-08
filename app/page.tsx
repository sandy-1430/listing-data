"use client";
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from "./page.module.css";
import axios from 'axios';
import Image from 'next/image';


export default function Home() {

  const [data, setData] = useState([])

  const columns: any[] = ["Id", "Title", 'Description', 'Price', "Discount" , 'Rating', 'Stock', 'Brand', 'Category', 'Thumbnail', "Images"];

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      console.log(res?.data);
      setData(res?.data?.products);
    })
  }, [])


  return (
    <div style={{  width: '80%', margin: '50px auto' }}>
      <table>
        <thead>
          <tr>
            {columns?.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((item:any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.discountPercentage}%</td>
                <td>{item.rating}</td>
                <td>{item.stock}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td><Image src={item.thumbnail}  alt={item.title} width="150" height="150"/></td>
                <td>
                  <div className={styles.imagesFlex}>
                    {
                      item?.images?.map((img:any, index:any)=>(
                        <Image key={index} src={img}  alt={item.title} width="50" height="50"/>
                      ))
                    }
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
