import { gql } from '@apollo/client';
import GoToTop from '@component/goToTop/GoToTop';
import Navbar from '@component/navbar/Navbar';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import Image from 'next/image';
import AppLayout from '../components/layout/AppLayout';
import client from '../config/ApolloClient';

const HomePage = ({ clients, categories, featuredCategories }) => {
  return (
    <>
      <main>
        <GoToTop showBelow={250} />
        <Navbar navListOpen={true} height={400} categories={categories} />
        {/* hero section start */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-img">
              <Swiper navigation={false} pagination={false} loop={true}>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/1-Bakery-Equipment-nobarun.webp"
                    alt="hero Image one"
                    className="desktop-banner"
                  />
                  <Image
                    src="/assets/images/banners/mobile/1-Bakery-Equipment-nobarun.webp"
                    width={550}
                    height={245}
                    alt="hero Mobile Image one"
                    className="mobile-banner"
                    priority
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,UklGRuQ+AABXRUJQVlA4INg+AAAQ/ACdASomAvQAPpFAmkmlo6IkJxacKLASCWNuvcGYY31OsM+q3sT9n0IeT/KIT9z26v6x/Fz6ffmR82b03f4X1D/9l1OnP5e0B+8fpeZs3/qf8B3lf5zxT803rX3a/wvuT5m+07VB+bfij+N/jPbD/gd8fy71CPy3+T/6H+w8FGAL84/vnnbfV/+D0j/mf9V/0fcF78vwyvYfYF/oH+L/83+c9orQc9d+wT+vPXH9Js7UgJfWoGpxnWZF6LL9SlMZ8xJrFpCPPMnD3S8yr5is999NYH6ST4ucd3vy+ZICq8shsXGwuL0Z57kb1PfxnQrZ4g8/D0+Exr3hzVw7+KozSWtqyVq0//8qBC2/GzUIQlf4XbVwNCChQDbwJsiRVIN4NttnleBixR39XlhaL4IP8Pabfl51tXvjne6CEUysTe8j/Z5yd8eW85wfbp4JrJKvAPBF+Ozb6qPtPnyRx305JbQjA1NEYelZ4qM/KvTT5TJh6ySsh8208ug9FZq0qU4SRICyBYmfW2Z5/+XN3r7+u/Msmm8jTLaH5VD2Y7wg3mGYabjIIMbB1XH9aPb98JyqI9/uhv+GwvfD5dc6knZB1OE3XpI/ZOlbyvPGPF9QNAeYrHXDjTi9BkIR5Cxn6Gpv85ZPF8D3ZlI3JEK1Vv6Z8WmPNRPp49u7ighpPhk2bTDOKDk50q8wyOjsFUEHmN0v4RFQEe59GbsKypRegwt9L9U7W2PwWfmzGkakTTYCBJsnOMzBXQwNr2QIAHIR3LbT0j8CzRfmnMXTFM/fsaPyg9mB5TIBia+N1Fq0De4LizAYkU5/1MxhSnLNykRKm73sUKE8iygQjFakNjiM2EP2vgQn7l4Vt3yhCjSLr2PCKM3MUl7S9k8osAOuBYYAgJTlyZ1pxX1jIIh32nwnVwNtvFgwUhXdO23Q5NgDCvKqZC/2xOFJ7ymLvlxO7ojPlwTcG+6dJW9TkUmwOmPx9iI2Dp7WC4vgbuudvpXaj/GIT8hDIJUzliPVugH5XKzPnmU65Zk3sOmCtw0f5IaLUMMcf1Q7z9M+SKfAsSwg9/fOFMxhn/+svvefCtDBFJxT/pckhZeOPrKvifaRkRKKxK9mD/eBZ+58u5Vc0io5vlDLWlS4CAcJCdf9xz3beD4R8uufIHfH9vAads/bGnlperzFQjKB+YmVV50jDa1+7ofJqiY1ROZyQFmq+xrkZVD1CxGpdCY53YL0DwGvOGs9zWNQjbfrJNp2YhD+QkIszdNjv5h1EDc2/7GcHdGv0yFRDgYS3xe9975jXKvyWEmm+Xb5d2cS3+xqH95s4Kzhku6n/c5CzRMy5fiWDDygAfSSEVoK2M6jz0EAX6Y5RfWhJKtfSj26aF24B3+yCC9FsmsQ/FE5Gc8tOxGXC1knwQ5ARbY7OJr4Sr3y7iarKUqU1U2H9aQW7p+MkqTH0Zg7Dt9+qu560VCQ24V9zTVOC9e+v+TuE1GwRWlHo4UPm5UeRctwJS/mbQfp8xUV7CysAoypeZ5wraW3fewEeLYMTNwKisz1rEDT+LzLFfuo455kREKZU4azfrX+a43XKd2c+tdt7Wxcz7qJDL/ZLv8HPfR2J+tPPmKOxsz1pDURlKNM22th+0l8QSLaA1wJ+zyoeTmB9Xe8FxxwzLxJyxpebmRs2NbBm5FyJg25rxvwhPmEXB48V6X+RfJ4j+VDI4IkTbC3HwF94/tt67t9MVDH+FEFO8RPnMXwqPtG35ZV04drukK405BK9d7pcnJRSOX5vPAHXvTRVq2sq0KudUlP3P+9lLkV+nO0fVzH8U4tC/Mv0issZr68GE8i1rZbfW0veoed0hhvoUME1PJqEWAWRu7ZmDfNPeS2BOXhNVKD7sFnEZXWY4rArXNVXjhhQnJYu2q0NgCZ4XUFrF8u+dKe87cvI9vGD0St48HmwAppERDjhKCMzZdNZFkKs5XflA7H47FbeatFQtsIU+d1zyr9SLnF7v70dklaksxjpKxaEEgLlLYnpMofeFrx7dphH02/zYGCZ/alE8ZWpFOyhYGrhZvV/++y5La8jkoS7A/68ccHoc1mCUH/FxYIYtuk1/AHahCdraUqeO2Y0Wn6d5lN89OsxinQYbaS8rXGlSl7zGZNP1oU0/sWibF45whqZVeTXMd3P60b2KsGJ0grb4WDDibmYJzbS23rxdVlw+D7EZo3jioDelWyZ2RuWcjsYO8OG/vgxX/+BakRKrBME1akDLId/+Ztr7BViFTmF97LOSr8OxIIkPqkocpCD6H1wI+/4k7Qx+6h+vjQWx9oh5uj425Cu1ebaTEo99ReKoeBQukfwZs4GQw4Z08NDETuPEfeT4tyGzqbX/Km6P64vSpBdGbEq55ZsSy8u4u1HdLDI/XQCPlaJ6ij2QEG9JcA69ZEj2RMJjCU9UR1BUx9IcDIRtN6DgFOQCXn6vaW8VCUHPUEqbwXf3lY6k5UUgdNnBXd4N12QtLzEqDwYoFC8SjPrVnNziIZZ2q/oSNIoK+0x9FL/gI7kBDFn4Qssp4bJ1WoA4tIpCIBy5N+X+mQUDEgSTyuTKAmy8JoMfg/mCjVMwvLpanulAgNqJQJVflcD14VeSNZl5wN9r4pB54kqKlgjeBxqYZ10UuUjnZilefxySPzpOr+tSAwstr+GmnTDtGfd2gnmpWe9pkiaI8ClkBM1EgCA9XylPaV6KBhLgAA/tygAABBYU7YilDCX+K+OeYwfdDvUXwVHTAWErwQZB2wGjN3K0aArhOVQfIszjyjLYFd8Gv6+kTUzoEWeIELbaBkOCnY6REKmYHQOg0sX92mOvA8B1DI7FjehAWLOU9X7lB3jurnuEvhHz2Q5xKo7MkvEKbfDJv+iHskjh3IV+XKyYCM7O/yGl1NYVqAAAAAEkQSS4/3VC2wJ297QPmKaqlHvFwAyAQj3GTqnu1ILIVTylVieUD/RDTQKNTYA5wsT35OYExGPu9TJsBsrsLWTNEsGG4qPA7OxQS+qDkDf50xbNvEm/+R/L8EtqNAJims/WYd5W85+qWa4gv2f5XPLCA0gpDrliT3bpU7nqbCFv4HKFP9E+h7L7YqYhvq1OcOBQ6gGeFhDQ1jHMnsACS110JrNiNrG4tAHARJ25U3vZh23KkH+2QSo3ncgpjMP9257CC7oV4IySBnjSP03nsha09yn+ziPmDj3n3kGibnajW4y7gqulxqscSfTP3glqpGUCrsQ0NvYPvRtmo5EOAL+EyW/B+Um9J8/ESpQotc+pKgfkb0o6wq/sbpPWEbKmq4EPszOLUElgqkTexFN1f6Vxz14Kbg2R4A7fWuox6x9yyGs+E8Nkrgd9UohHCsu263RX3kGzxXJwREjVuQdJk6H0YqU8nXFJtQJ9/AYzNPaSWVSXMggAAbT/NqhA8A/DOPlJpPXisNQAipmbFRj7GW23AZnNl3EMxwiHvTJwJUW4Gv8yGBLiGkMdtmiWvjSV9Zo0Ksbps09JZ3vW9W7JuaSwvfgdfqrhhIniA58h58ar2veYJCY3C6nKI/oTxoxktasVF7doKomPTfM4k+2i0Y1nhY1aSLdDrBHypYz1+LW89tyG7+Y4zNM76dzDNfp+PnpRm71hekkBvF/cj6pKe5X/7/S0W6LWwAJWNm+A2xuk4ewlh8OnQ+6xPqNCfRK3yNLU9RGGtueLF+pZT2L+dCL8eDQDElFLTNoLTgHBwjuUH/IctOXzIejTROOndhaQPc4PN697iWRmXooGVpFEdGix9WeeKqhnFin95ZvHHc/iIEUTsNDf+2VIB6Cn+CvsjFPHnBYmTsMqAMtjw38zfa8ZQSqfVH9Qc52+n4a3gDwloH3sQBRidBTV/XG+ndFlipqTlA8M3zn2Lms+ZZ2AmQ806GjuJRD7nF8zuv8daILVFeIc7zM1bahejSTPXGjGdwnQ+WkwdL0dWy081mV3T5T8k3lrk/NsUDKHfVBt8Z380J38ER2w4dxF+ZxjV7DqfCOCchYAx8fmyUQtVJ39rW/IvwlMeBwzm0+2L1KqKxnUo4scD2tt6J3wNVrXI2DsKPPvbfTkB5oaKWuprmidrQRHR4ynk7O2PoNVBat92g4PTJ8GQqWfGtFuKZaTprm7OEqIo1kyMF4qwSc5H2TbRRPzJi6Q03MR9+ik8K06cS8XfUic6IF/RhU5b3rCWUoXWnw+3/VinE0WbXtV6GCQVgx5xYTCPY34CdGehg/YrlgofJR6eEn/CLx8jCfG5r/w1iiQqs6otOSM+dA71+XAN5nh9uxqcdAzjYdS8IU2LS/2olPhJZJVpa6MDL+9+p1+KYSgLLJ8/gB7iVn/A9Zwm5R4W80xMDQsla5ct5QPoZPBAhVuMe53mS8BLevTQVZAJCnH1gMOveY7H+urvMt4hN18JyBHvm8PteTCY6P0rhhYtt4JGzYV39bCIuyMdL5IHdZx6mdstxzJPRq3g6O0Jpn1FZ116aEWDyWp3izCPgsVw6zaBK+e7vqe5EfUT57GUz4Gl7jtM8i791vUat+YtFO8pAR3uDgiNinQEeH/FfmQsPKnyVan1aURZxe+UIwux5L7horE+Mym83JkkE1EVGmhZP00LzXm6lHvsxL/k8N7X6sZrKYVdmxm7uVkM+88JyhPSRH4VbZgNSefRf+iDcfGCP9rrKp+x5YihO7zm8eU6jPIXigtfMkTn00efgiawDrKJi7VwEhfRScpftZmdzsrMQqTjMyHZhULRkCXswPuboY3YkZe3z+84SkBWbIxrgeAJu5gb3qHlsqIDefSzBXPEIK+b49z/Oo8cIii/U89LII0keOlZ14ZvZPO7i8R7wdcn8HLNvAmnkIluxfMm7VuGEY0enOY3voLXloQjFEuTtL5E7tO6iP0gfr3udqbqXsyfHn01MaFRYWXdTPapdsD1UmkfbdeTei6CM1Mmo3KhZnfNr5sVgEPS5uDvK2lu2tkuP7+wqgl8ejcce+KAEwcnD8UdMUi259qO3ck9RoNbgus16u/CN/N9NLZ2N674JbszgyXAhQwuJKO4z/a2zYXIZ1k3C8p7JMGt/q2dqBnIEUc7OfMQvsmtYf/XnvMFRUXwjV2N2p94zEirGzZDwKi8ZaVw1kPs7nTj4ippXmslyTonewIkdlWc7UXxbE5iPFCq6o8rkR6wzCatcpNg+GUSvDiW5aIeng23LZbzdk+QHUien5IvHFtup+XdPno49CcoiE4mhWrXbfyOX92LzI2N5gWzsC0CK22rJNLqQXoSs8R2Ta/CRVh2KvfpSOUqNlTi09ikKxBoDdTFE92wh+U5JUEP9llXsWvPm3gXQPtJtJxdX3R0/OQSoPI7aTvjUea7hq/bSYEgN2o9pVwNm5Vf0Z5H09ajjs64MBnTuhxyo41rSX+Ch3l4++uAXU8HhbImHMxvyeNt9k8UCazq/NZ2vrMbqvIYjnKtaztR0GSc8N+1CO5Rb3/HPPQm+dERr+BRRi+aXApXe8OnWc2oI6FKEocbU83Ono6W8on5c+qgII4gd6uOxxkF6OhKxl+YmQM6QVo+eE7K8exqTBnPaDR3dyEyD5bmkOdAEokBM1Kxf9TeDCfeS65KcBuiZ21k1lwGlgqgQncWn9q5H2/ur24rBU//OIAXakNo2sbtpjcG6AmzNk8TRHGBXKS5AeH1XBg3AEY8vu9n+J1Rq5eldr8ahG9TfQqxSG5zYPaHE0XlUHO6PDedPBfrRAv+xLmEBroVo/J3xganxqzGnnu6xTYLm3g5VWm79Zu18Ksx6/+PgOBhTlN0fh7LB0PqlgxGzH8k4V4WfIIiTuXLGWVhaRseB2GDas4hmM2eDdZwHfrnxoLxvYHanZ6iKms7r95eyCwAHuzvswoMdQKHi+PdVo2x6yQV6SFu5PrMiSHkSxOwyFEwXC86/EcS44vbH8wbXrl4IUdVvjVmKNYp7IYihml3SCSr8jmG6e6YwnG/2S6TGBVGOqP3rejrXXg2zrV26orJ/oCS74P+wn1t8Ruu9gv/iSPqy8dTY0vQj0FQIyyCp7rCWGC/wzkY4MPPbMY4jdFnFaomc0gVI64t6yfH+0GMjAvc+WvUwLpvyUnLI2SF+N9ifBLWbWQUnnTV7xmBi6iWQwjM5RTgX8gFR6rt9uGZ2RR94IQ3a/bwluloxGZZegrcdAwCjqDmFY95Ee8tJewIfjIlYXCnZSe5Ctb0/VUMy9NwdEdUu5NUC8JAgFxhP4imshfBMqJtEgjwVhm+VYLuETjgJzxSOASXno74imBWLuUy0hNPrdiBNqddjXH1q0b8Tw6v/wFa3y/KdOwY4qpotuAd8W+dx8eR9uJ51nQV+5zEACO5pJl8o3hX5kYgc144Re9mYRIlql3P5HBhUY55K4zLVq95KzQjRV3LE5DhMm1oIQUK6oeNGS+mf7jduQaOTDZQ7jb8V+otiC9BbY290mP7cjjB2kjhXpItL8RqR2lju6xwGT6vl7tikuxRpeEdOwORugbk6FCAYC44B03/Dhmha7u0Tod8PuXFJ/32pw+caT1gdWcKroKongBR49MgwcF37S7qYlTBH9o6cXJn3gOT2oqy491ZfCZuMXX3653mafQPYeJ2LKsSPmFRHkBMf2+ABS7rc8ZyVW5xP3rWCHnrVM84qQa5tILOyJ0YKgL28wwTa+3XyomNnAM3cmBB/BKZhJ93SVvhQ7/o7V2kTE4eYpIWP0sixYrBKVaAlzgTTWfeiXCPN/2bk8wOr8tsjvKz2sQi6Z1ufNE3Ks9E2T7S0vxjO8c+OwM69M9bcmFaV/HoRBCO9MSMAJPP7C8JD0KroT7LXvuJV0tTbzNqFzQiM1EyqUSKLeiaEVP/j8hAE7PN35dc8hU4papL2ty9S1RRxcDyvvgn/NrpyISUgiChwhl+4p0JbbpAF524cKmaVFlGh/vmbyjJhYMRhwcJmm7LAil8uklgQ5G2YxNeLT7Hhbshn3D15ylokJcp1OaavD9Kp4hQMTj/aHGCTRy26Ue2oHpUwvNwzBtxtiSjbguDjg/Ve+BPduQPMsPF4cwfLiCyDrq8DtvuNppljBemKfGzXLOzBgAo4+HDCKUZPWbP3uNvat/IAgTAUjBDmOEZqWp6NrM+kB7j42q7s/YYgCxdFA8T84y0XShLCKm03+mLSp0tiYRC5Ke9+cwKTk6rqQzReEWA8YlfjFj4cTFN6Yp8OYb5ZC3lT/x/lDgIAo6QxPaS9oQWTdxX3hIIVWmtgHBLHMxFc7Gbk9gETu02i5V4ASxCuACnwQmK5QkqEoYax7gCfpNLUZrvFSO1fSy6O85QJisZQEbsLCEC1rnGWEaq7Y3cwJIB6+DEt/greHg/+jk3cTZUXzKWioeDPFDzlaUnQymZzn36M3/S3V6aPkgeayiqDb8QHoyoXoiWC0rbh6TgNUE4DeEWeXARuqc6uyzD+32Ynk+2Ha5Bd0ZEyBwPXzAj/nu2yXrf4GAuVfRSotdCZ90M9+Y5oWjXV12dTCMT3c6VWQpaXIPCk0bMzVJF5qAIfYNfrLAZaDdTa13fFfnJ9qj5d7/XMOttlYrLArDrQqdzNVT9OjusGeflUzloMwR9E3tCdMpb+kcKMfoNysBL/3pca4HE/n2+AYrZ1ybn0wzrcnxY/wF7PD6C1w4rbOIdJo5coikveQvtiCAbOqt1Vm6bYMzefP6fUDK3xwq6Aeis44d8sGVjrn7kkNzUVMwmF4znwqoTVXS5QsZbIqxUTNIr/1afx4XfcycLCH5R/dE55Kp4vXG2Z6WCj8RMx+oGfbltJ3zwRM/O18fYGUNWQ951U229aL3qv8Z7crg6Jw19ZPIyrFcXMBmhC4GNrlP70NN7Zb/q91nIPfBuAd3ixfxxCbzdBtuPBm7gtXXrBhwdLZfvFMKipG3kgoMCmY+tlvKN27WeiO61YT/1g1R7/P1WfEcr/D/7f4a8K6P34BKw4eFAuh/FgOAxVOf6JAd7GIx3qlMwtHhH/UXsmmX7O5OQwhqUaFU8V/l3gNgdPzCWlzLpnuwJdelnmw6/KYftfvHyiQ75VXluxwWtYrcLYFnrXSnTiCAaWFF977jr3nCOO6EYIXA26qB/DDirsYMYUJuLMpiB9FIEHI6kIchXzd7tt4zv0m6gG6e0nB9s0Pex0x45l39bg+xmOuazVfpsgmtlqKRwdx47tX9STHH6adP1lxizktjVThsZXF44Sezx/aKYcBvsNGSWhhOcmZQVqVczNFQB1FApP7+VVoAeTK87m0y1/G+MjHWDpe4cSCW2k8HBqHJKng/Zfioveds4Kzxe7OT9UoWoGX7vFOmCy0P8VAdWa5BNlusAeML8PUyiNBpfVn8QR3+1uG42nBIqzdMROI2Ynf8LrnMdOqPYmlGnbZTAdM5smJPY/s0Ag64Pv++j0cOBRfZs1vNKAm46qAIObBpXeKM2Ye/auYtDY6HMImuJfeHX9ps5/5Odwq2HPSSjDGW2dvvHKSQw0BGIr8kF0tVyKrd5Gi+gBMZFAr6lqRjm4/XRcpnd8PzOu4azleg2U0+L/aaoB1E/tOhn4/Pn/lOiKTCEpd3o2M7GfpTa+BtXFDxnrhYMkLxrYwaW/ELlC25UleDxddXJ5ys7ngg4NHOoYJX13HGhaIVlulMBFEqagFp8QHQN/Z6OX1V221ngXUeENgXbP2iXXDJy5RXJ1wqWeXwO/avthkAka+z7RZZpfWmEcAn4mgLwi3KHtVyffhMhf00L8YdNOO6K75MGD9xg/CS681TuM2iG1prDqN71T5foGZWUTGHOKcnMykQvl+AHAM9owQYB760aGhImdjjG4JDTt2IGjw+nlpjnVaa/p2sSd2Es6LoNgRS0T5YcAGIQugXsFaiWIHy6I+eSFm1cRFhzSf7bxyCnKeGcFQ9qe8lt0uZLtNai/ChX5YxetvS9W2ecgC8mAaTDuuPAHmFdSd8emM+NXReDziLDXBdx8fM21EqUXAGYbJdY+mnElVH7NbqaHQpDEKWuAc4r0WakCSSsqq1ALoXu/CQBCcsY8ignA70nY5TVgKaD+uDxXx/ePZB6qxNH5UN6Guqyve7VFR6DJEUVAE7V+fPXR9Fz5C05L+BwQ5Y4R+OW+iYiyG5NvcRIXxmos+Jyy6DPlbu8PuCYKJ1NhC7OYsFoTFNnd1i9oh7ggsSONVbbY/0ovBhYqqb8HMxmV2D8v6W18CoM5KAXny0GNMPtGgwC++iYWHUO/ZT1O6pVtpn2KugGqCqUXAai0UWC1ZbYOg1AB+jM8NM+5Qtr6QiBxQolp1ywGjOQr1Ca2ohl4HwEDWN7/wc/30ppozYLc/Ej6rLI71fmwqVl7Ywv1/Pi0fC9bL3Yzv0mmz10dSasOJ87bhNnYB10vNw/H0z7QgyiMaRc9GGMNBhR2rbLKTcdB2FInsqUcml9lWdKK66tNRme2fT5cWCC5hSoUg6A+M4Fit3w2Lld/3Bt20xAJW1mEX2nvCTWkf7zBnGAVrEMkgxs5OmFrlOtzvdqqw596TDTX60oJnWF+UJgzaOV2GGCNqM1TO7mvIQyUK0pvuHw/Hnyr0DVkhOdIssqAFmlNAfDE2HCqBxjUbHrZukPiGEz8y1J9QdEneLbm3V/OMN5aCE05F1sBjebiaRukUYp1gBvSNC+1FREzRRskM2LiOOJS7DC9pUfEZZlCa7c2ZcHVg49aByobsY9BOlXRziz3WW7NNnFw7Db5K7To26/bsXwXpSPgIC7go24XzHSE7jbwhSgifB8eL1TXGqiWfMAp3aCVems49SNdDD+ie8cD9r5V2zidJBhWG+Xdl6+EnHjbsz96wPMEn4sk1KJobpq/bipFqBz4F/CQpRoQcBoaV8HYlUVfDOhlKnQf32gGKIkNiMdpZq0ywN6cNbBDsyxIdMW/J43rmW3/M3P2PJhpwdGvBXpQnUyVCpGTOzpKIWvnEDZHe4OsBXI/kUrOPOWivmIPDNTET0VHSz5DSBD6mF77/pRPBAY7fVyQg1ZVkyHnOGtESX+ywbt223fI3MpYGh9wT6FlX39ctXRvBLYTwrrABmzsLJv/JjFX5Xr2VrCZJHz3TItLNLwxxzKFuZ6Y4Hf3iaZnqaLbfmnH1mqaO89pbI5y65lt7FvdhkjRMMiw6b3TjdptmDau4LceFHnxK1RA1byiiDZiKgiqQhtlmMboRXO2POO9SY8LI/qhOhVuf3O46x3x093FRC320ltTWgE2O6PMXCBjruHVYL9XIidCsBcN62n+TjuBz4gqRBfEpV70nKWaE2bG3v9gjK1ZcyUsHKQp6Hw6BYctFP8uo1mqoGwwjFjCOwX1JY/IoqiszHkZctmR2T+mH8o8AhAskoYadTzPUxOEunOG6heXGzCqo9z4Nt9+6alDUHB3uOvDmt0pqtLZ/MzEUL6lUrlHC6moGMJrmwpkPARYRKkrcQ7vbQxpvJ5Pc6E1bVt9WdzBwF7Bf6GVWIYaSX00jtHAfpU/YBrbJOGoBXgcKF74Pyc9i2TiIcYLVnmecYghrxhZ4AQVraCsLYtCbvduZsua7VaDFPnjJfdBFKqcwdxkaGP7qoQRT8PwdA9eUzjd2CEt+bJMOS1ZijsGzAdQ0trtbTTyXeRW6KerO1/hhln2kPG65P1bs4G0Ko6S0/NVtLMMdVnfFACZaWIkB2KyGF8+R9oeLo2Z6aOMkEGeQ1YEY0Rik83aO+SAU0XN+P+HdjajHaDjgSe+VqO0B0QGkUZ1Y5yg2v8mFu8LfvBhOrn7CLdtIUwzb5zAz146k882PjcK76NVNfLbKVU2OvdiNGRwRzFMJoE/Hey/s2YML9vLavhuh/ghLHJEb2M5dw0f0As7fyka2wnDQyMYiqJ+cTCLdKQYUP2G0wSIIPSrK8w0n4W6PbSVfbbOVZkTMWcmMtSyDS1qQ8EoF6GC6aTtu0UvBexxEehCS1oOH51UgTqr376T45efa3wCBxu+mOLlZztiE/FfnfCjX05yVYv5fcvncxo1AX//Xsk2EcnZD87XUBKAACr1GlTnWpP4QrTU3sTXJkVSpxwB7Q+Jnlg8Y6OqwftTUj3+lRJpOyZFgudIK7TzTqePm1yNuu99vJVwTDM3zEND/bDq+e3NgUX4T07Oke8B5a1b9uI3DcWNtsVZQqFS9kvyf8jgTsABqYk8ZyU3EmvnMJrHTRv8IdddJPvxbtnLVgw/1EuTwOuYL31vbkihAIZADgERkDrnQDBy2Lfu6KRnWI7KyE24yxO9g609CWUaLLkLTe9X+Q5UhnlzrTr6c3gT79UerLt61YBDSIqDnhu+zLGfknNq2bwTwaR3+70txuA6jI3Lete2bWFbcmaTBM+IP+smABECzYNku8FxisHRVZmhUEO68GDQyS/9n1nfcyqL6oRLz0ifBrZ5wx1FVxTAz0EzaBz+P8sdSGTRI0/L/8URlwaBwtuW4XsQuBEjxsFB5oPlalgAibpylJr647LhE3fyW1xf8X5qVOJPb+3R4vZLJZ/zV002cXQSF1VwgiK2L3sWvWzNi5Xfx/eNH35fqrMc1em2aZzu2GfbwPwuHcHHalLjqHnvmMWJFNIvlYi5NXKWMvwufi8RfLWaWdofkor3W8KxL77+s/nptXLDbpxW+rBChCqM2+zjZ+mlcwZci7Wx1dSOGVcJ+85dATTL4n9X+pKsc1yB1yINH4sF9BHQvZoBTuW565xc7aWDFSNIEVCL929HfEsYydTLs58EsZmgBEu+HnI2gWyJzjESe7QflzqwHJcsmA1VC+JwbwaCtX0bEoeFMGS1Gdu5nEs+j2ZjMFI43TpPqjF7hhJKKMIbv7gnJcx/FcAXVCsgXTfKlXV+isrnsmXXvAjFkjz7XN/lvUiVf2b+Dn90IwpsTjbImaYvKzGPFIxwb7ri6bt5EvaG3eI1mT4SZDw0wKYO9jTSzCmp61t6IldPznSTHxmvWPonnxpcZ099K9eMylUPGs9TMSFDY3X6ob26BmpcDZjTY0L7eSxPS7DJOe4NiLP02Ip1m2aDHwCCSydUbsUGn5bw61iS/F859NgG7L7mPJI0DNku8YGuiaSkGZIdR1ZA7+kEUP+Z8DCPjMteKtDHBxsu+Yhf1xyw6FDy1R37A+UEvBtlFf9cXFchzy871e7R6ko4zuEXNhAfHp9XKF5KEPQWUugz2f0mrlNIRIoyDwLaFh3VYaVgSLuzLUJVnAdaAXZkkuVi7NyOBvkOJBvvLfjl/zFjt/4oou9gIZ+O7Oy3ZDQLGBiaP6wRfYBNc6H+LghiHyrwSUiWkvvWGfcKbqxcrdi542BpYM6uMBixZ9BNf3T3J0RJCYS4C77ErBeRMdpB0z+1oFZTFM3CjDKkW25eY2mZ1NbW7yPk7Bwb+uJu3+MYTj4RbkGXzJjFHQFx/oAYZ9XcC/+UQdoHOFZVdsz1VOKrE4jSJqmS4Ozve7KYy+aTNrqgjGaHeWLNM8W5lJojTJgMuZoH0jcvhuJea0sWPUrv7rKAH5aFAJcy1ueQuM343NBx1QWzpI7ZtU7y10GMyJnxZCzOY7thhLsSnxgp7WCEU9ZhBLJBjiBx6aMLWfL9jNJSj9loUCDUoCF76EZ4Ot2w1XeUWbu+356OsIRauwkI9BDo0GYTRzoCXP+fW70GfiNmsf1mGgKbg1pWrEbboIfJ7mHMAgIbQfVv92gzPxq/fGJ4kQ0A+xVlwgMYgC7ex2s0Ci0YAjO0FzOIt3LOUZpWm0zoQpV5Mf71XbuIm1V3yS6bRdGNQSyJcLCTCzQICYT4vvBMjH8Hfwsvcl7dGuc3t2idePGzLWeUBS08zaRMgpJ8/fADA0pvkIFjmOJ1r3mdaMJ6chRSjTCPkXzUrNYcFpLdpu4p/m/09Y/DrvYh6k6PkZnc40XsH1UgD8X18BZI8aOgMN4m8fmeMg8T4opTLXyVdILJ48gYXe1cD9IxLqT3P3eVqbMGnVtdgVq/qFwGhavmIZ3S+j+drA9hYqJN/4ihkj64xOnSCuAhOc+MugjRnQs0DQMagjsxYCNdhn2L94p8b7C13VxruLF4ONyQ7bN8JkJuy9GOdSpPXohRvvgz2ppAkNTAFwuicp4ANeq5TEWLlg4vxW4k2vFdIdmlSPuoGtqXVGdL25K2R4Wf6Dh0Gtj5JS8M+pD0HwVgE6qxMnFvyi+Bcro6RJ5fCM+5YbXMX6+e2hPfSs4TZIquSo58YJO4sZV6SLBnuTovJMDeHZolNvyvAYywuaTzdkcpnZuNmksfzi+um5zEhUNKPJW9x2SxpWG1rJkl5VWpj5QqyAmy7inSNP6YYP1D0iVdjfeNzO4/uIFeWU+fKTHvnFoFwgcy/kh8NiuSd3ueV8OimhI5VyOKTjbRE5QAxmqOB5BylPjl0t8SBs4eCcuKpmQF90hMJklQQMqlz3IZ6D4XHOFhrrt0yAn1XXPX83b23el6KMZMZjiMlnLYZMA8BGh/C3lGS0l8Tw7tJr1i1RuV1UFcMoJfvYcoZbZ4y+J+W31jhaLUKw70Gcw6wVrFscjsbp5T9t4+tWGkIove+AOo7u/bh83X9+lUPVxOwtAKZ3SC31x/VFB7oWKmmMZrfF8YOXA8sHu+Y5PqF0H4ph7ibxhLFmSz05+vMEMh1mq5ym2AAxlZQkRAOtysxi67wKs1vCco+i6mK9FS9poJBRbiN6BlUGk3n3IReeZE0E/GObugawKqEyTEkkz9z1sJNm2f5luOJM2rRiPcJkhcxW1e47exo8Ra7BmX039OCeUmqYRYcLZ1wPomnQB6/V04lbhx+zYJjT95UtKsC8mjI/U+VKYTlhyFojuCMViMbTptmHhYJb3R83XwCy9h8m/pXPfZa8wMITzwSqMuc18ZavWSBs2PHebOknrz8CrRWwAfHDw9E58waiDy1fRDUQwXqvBhl8UC8UONwsqHtH6qHSRZIX/8xrg/2Qh9muh+UIEqeF/T8e49ebVBPapOUN5MS9RJGkKJrXws9wjvrOgiQdWgYjjq361s5aw+1Ch6mQLkNrZ6tM/ztHe6mxlKsOvLbNj1SZw11oysSx0W+AbVKoDij3Lick2ICvHy/nQivdueVyoYSFGNrAztadjA+6czv2xu72BBgadcuXko+qk2ZI3k0M3OBa1hhAYi1Rpa0CzHfxDdsw99ycC4GQYWVPv3964Ordugw7KKEa3es6nWHllnRP0GpHO1KvtodaMxtCSPjV80th8f54vz5kKAiLkvQVOQS0XKsofBcGqa46nxcqNu8A+blJjsVMoUvetfORevydBE+JBwzX0Te/BX8bbaTFKiIqHGA8ATS36sKFoy+suj7I5K5td8LpN9indlw+4F0ZpxcVRUHEeTZEQrBWQM1f7kt188sUaDF5HvGu2q2xnhYK6kNpCMXtvTAwVDG77/jF0og9HXfqnAgsimasPAxM45u0XzcfxqmJQJp9W+ApF/GvNrRxqxZiGoWhXlK54FQsc1E/pLSS3Rs7xFnW30JW2Vg/BV/UVqRL1NgwZSApFgcmxsBth14+Xof+rELC29Zr8jkfbRky+A8/dAhf5GO4SL4ssqZIrWADpmxVks2ulrRbuAOh1wony29TVmj4uwgmdsCdbm3LPa76Jqc/vWSU4GDOZjB6+oUlNUW2TSKcKpaQtjwsGzUMNGAXdR1TRssx19056w72wIRZovfZ5ESvtQ6qORP06gnaFzr7p9ayLkxjj1FWZptOcca9GLnMtsGN7EH1SA/vAPQ0fBzsmjK/GwaZuSQAqlCLt5PqVN/TNTVLDr0hI26wIzYdEVvY7fNp3DYggigWBQEpXvLU8xlx+7kLaYjA3GDAHtrKK+Fw9nALs6dy0vYG8hJ9hQ7nw3SDW6aRwvfjSbaoQZCbKkqV7SvY3brFlKvUEf2K/tRgAy+9ZUmja8lC7PsXzxhs6lySK4hb8mfqm6mIztiZ4fTOUzaol+XSaiNsAhrcTmKZHT2jPD9//XYBqYqrE4uCVgF8qwhvmfVAWhalXc8rhyaNdDpYc2IPFzkWVklhvLxvgbZdOoMP/+bsRFoy1tbfBCwW9Ev4cnLB21nGTGTCKmHNcV2rkg/vN+71dpd8uUb7uc5qs8bd1Tbce+kpRiUM8uxFkBKCoy6vCoT+3O7DnySAUfk30W1AJ3Ogr3z9HR6JA/xTyN7q9+EQVtbzBXoSopQ4L0sPQEXYhnBvNqtghpvVOcrg81OxWl7wqpECiF4NOw2eccmLu+KvOOjWD+RWwTChOnxtlDdLgLJeNrGkSJIv9/PwFoWV9tvjNz/8J+9yZyda2EqlDF+cZFI6MegevUwKymESc9h7nY+XdlQbaoa7krZmZhqmXJy3fCcqxEAHIAlOYqwNdOG/AnJoN7rlprsQZ1y7MkrPvVmPl07qUN1VdSfmAT6IZhW6FYQLPxrD6H8jU0e6Jm9adaTSd126cSRbko2Z7u9Bx89DVY0/+8Gtlej250BL0G9imA72uyMolrC+kq4iqEXDSoMHhnNU9lxsary5KSeFIJhFUtkUa4okMR05Y6ewt6QWrEeNrpI9ysS8ik5bH+G05kesSLWZvtXuCP5bdfsrLptFR5N/xX+U+QnSUtRbvr2HSspgWoxRm5ysF07sGiKM11bMXeqt3lBCG1OjgL2Qj+MFQAmAx51M26/0zqqxoTOg75GEzg2JZg91cBplYOiC1tUsZXQs/aSGNpduYuqXyt0golBg/Jv46CQ6+vhgV0jJOmH+O7vJsJc0RcPYXqWRJEpbRd9CPhHbWvhPWTiz2dnV6zTDUU24q3N/9QJPliite6k4Vz3EduvSVfWXR8z5sNGnqxTKYb9X4aNl5mNvbg+YQ+rPFaaFVpSKObSqh2b1MigOilAPOsORdLJuT2sVsZwdp+dgcU3JkO/vnMCAuobqVZkNb97rAECmspyLlegwpwmBFF+GTldoqTE6kaQwXt3b8PSB92bI40Yp6xZGtGLFmvLBgolkDD7IE0fHRKBnbAbJv3YkeSzI1qrTyzTDEV6I+2qk58RHkrrUYf0VV8XSpSLYBDcSuP9KjSlwvMstMb7pla3vcYDyXv16vWILvTz8s7ocmRzeX5IeJ98bH6cbhNCRmYLoL/Kr3RxRvTehYydK/On5Q/G5867JrsL1AlfSj0llTlk1E+X9/VsP4rC0yTMIcYvSMiK4hbLlcbNqcgkRVggkd6kNi9O8xqmK5cmA8yJKGHSth8xDAdKvkAy8owKYEOM8V3Ov3FBWceREGXBbdAntuJ6USUZ1jWu5SthLKPKzNVcU8Qo5Wih073WvgBjocJxZwfi9hJt4f+g0SBsJJds4R3DlFsD33Ofgk0P4nPWa4sNNQ/9GN7KpfIgV9bIseD0kI6vylxNrCh+D4FqdU9mnmUay3h0Bk+wRwThM/wmRONU5EeruMKg2R0j2mfxPG9dqAa472poc/vYxLS+RMcurOyuF8t1ntE1XsZt1G+qrfGA4El4YTQ5mZaxVCj14rvzSMSeHl9yLE3IKeWT4Y+Ly0qL13D+cRKjH37IZhyl+icX/JCYgV/Jr+eTZdT51BR242cFw/lRJf44F7hmTkZOEp/yNWziBANb4wCRKMNzwYdfhTZpyQjLMY3ffQhZWvadDiIeXYCmCY1PEeMh2Og10TWt93qAsKJoSkNB0BIn7NqChMqNiPDwoKYOHrm1aNrBo1UIpVyMB7C+KXsK6KNUL/t60d1c2zcpwcNHcaStdYm++iUArulvHIhyYCUUGhwIx/CTKTqW2eGrzcDJyBsLNov1J9dqUfNDcjN6EjMY5tp/P5QC7tqYoThctha/fVn8LziSlsUaYqPb9Al70X7XaMNrP/g7dsFwsQBI49SoKMUNVE3zSRjUwwiWZjlvcIXgvolJJsmTxo7SzUI7qYB9YilP7KjXxKFoU2LzNk1ZQRVrgHxCsLz1RhoouR0qVAV8exUImJ0nCQ7ghVRMukMTDeo6d8cot+dP5CCWHxJflP4V6PyCb9tlooJuKihhW32NwuMI0EVPEwsjgDqvZAJRs/wECLkZih3qyBVVW5xw8CM4fHOsRJFoOdgL63gkdaGx+bsOmhBAcFjouVAk32iH9xfn0UirOP2uyf/bwd6UMprrpTinhW5mjftNHZgceej3XghazcJKsNyoVs9fo/PQGKew6Wl/8xwCdTaz9SH9FUunZbCnlO4OYuk+pi9GlKhYQ6vD4eNM96Zj/rcCKFFm/XPOhrXlGHfj5LH8n+vJ9klaGyfxniRAAXEYoz2IRVmqc2oXu7l1XzG1P8seTcZwSKYAgwVgkkb1HH7HC5DlwAOlWrLR/8xd561dxN5TJ1nIJOTCosu5SP9PMjLixS3nKAxjAEAmeQa6rIvSON0VexB1JESN6q3LOyMkVwYoH9mVd8ozcPVQZvYJu2deC3r6VxzcKRXDyL510Mc3vUM+VSjhnbKhqWU3kN8JnHSbgFFr+i01DebTbF+O6Ah9nPJEnFQyo3ak+0dUSWVh/cj0t6N5HE1l4r/qN1/5mrls44q1b8JrWzubVgDeeR2dtkKBJKWIl1tZOfBFsLm8ZoA7JcmBSCkmpoJIUV2i67NzfiKGSmNVHt8israbaXh+B879DhRB6y0dyDtq+A6uYnScIcOtrnzTw6dApvrmcOLbaWtGz5VS28LN8ADP0DvhYWFdWb0YbINDmoAEYDeIDlmzFfKRAhdHP4WkFQ7CS2kFl1BkUygEmH25SggPIFrcA90tRu89RpSHERxJVXEXrHiScwtRSv6+0gMAbgR7yEzAj9CziTMiawhkylSE0P2UdYR3FQlknOJ0jNsJOLN4x9l7pgWkxNMLwkucwBUw/62ZzfQIOe5hm69LK0ZKxKlmez7+QLhAbz4Y79jnd+K4VDNKmUUFT5uN0bB3H2UyOJ1f6FIGebM0cUANaVGDhnxjXpbJd2paAutz87VSiqKAVAUJrirbb26/7ut0xL/Y/DmPbFnL6QeAcOXHvu1m2Bb3hfJsiloRz/KYc8Wa7qD+NGLHTJVa4aP4U6oZaYBJFNRXQEG/G01M9AC+YBXobPXZdyrrcv/k8ZU1SnJj2wItDuGgK3/ccJILMoSYt0OLyRf6CDIcFHVr4Hb8UwIizHhAq9xZdtuRHgZFB+FnC2O/qlmL3JMXGUUyJ3TtCSSAMpoosmUdHYX1N514xQRBbCe0zvlWstQM2FMCddFh11jm1vc+JifMFbMEd5Y67YPCaXbPa+ysg5xU8+zfxNZcx23uE0DgP1UsPBeXAAvAIdlVUGzW5uVTNOGB1W2sZvhabKQH/YdIpFsBwhIXBiJjDV3f28udSx+4c89CE/H+FwCGtAH42Oiqk7uu2fd5GhrlBXf4ncz0ygvSm3QosTvc7/AaGbRd5xhHTBJ36REZO8rYQjgsJ4eS8/Fz4u+3SIUHW4V1AbkiDiE5SizUB2BuBMAAwkhomOIiHXLlXs8PoLt1wGdfVP5vpA9XXyta3Q+UdpwJb+TpX5mwKlilSpXM7gglMmP/S2buhTWJx2tW4sVvt3etR7f+94y2tp+KrT0r9p+TAXUQkho+C1aqmS291fQ5RKHpzBdd6v2LuGx6ubcDELxslI4i3wNaXE8P5ym11ZwgPb8CvtRvH14KseVYRC/xgxGziE+GkHX3jA0JaHrI4MwUB0jghtrpc5NQzyZo8MHprPxDgx9syBuMHRcBr8LY9FsKEmOmIWVx3VKAETux/ypWghrRDY2FAAHQRSXRcPPOmkS1RanAU15C4hUn5jKdV7TRAtVjKdV7aZvX+oZ5YzM/oQ8WOvjc5sc6g/SLx8RgTqzrftEvW9D4aM7lQWe/w7XIngSEVTdzaOzsCmkNov9AAAAE0zCaE0ukQllv3hYa6G16KS914TyBo8BN4CIsrd7Xh0VB83TgHM7789uzJWu545wCqIIV4q8RaUZZKm00OhmxVHbWBdHXarIFGXAcxlnX++br0E7yse+D9CsxVLNAN5qqVtQN9c9N+ufSihKOQ5MEFK23fpu1xU8vGkCIWWsvYZqjsFAKhJz1JMYBxUMAqXDrHrv6OCLb2xojQVuo17VecYyxn/w+dv0pfd9IExAgfnKK805YJGZQn8KdRrEf2O/VlGlWyvHrJnH+XNbTDdNyJash28wIYl501O1ism/sYPWjfd+FYrcJZ47gjGI0VjivG5JVx3FYXl9/uB2GlyxulPDP81/pfunRXbBTm/GwmDkSCGCTXLIPc485F+Qu/w+e/FIVgznhJMUDYIDi/kTrE2fXdyQ8LvBmArAXbal+j2Asoeb7aGp8c0OsfWufwiPlbOved7uyehis70K2jpcy28EL/rT26vLfzW38+kcX0TOJWbM9ATr2p9ztXexLMfloMqovr4B8cTPEeppUorbU0SHuQcdNG/dM/zIgEqe7ic2Z3fKfab5PLhZ5GzyMGnzVJd5YszFMjqgYsxpqeZk1NHPh+l/yfOXf9ys/fxC/YARs5owv2D/EVS4S35dRPAPh1S3s2vB/jHl/8ekbFlhgI/b2Vra5R5D5QBt99+PSs3FaaLo9EuGMtop2y7nLZdVVTz5J0AQczRSYGj/Xlfy0v+hmn0z1e9u5hrZymEhv9p7LR33o8WI3Ns02h9XF11Vnq5pwQ7EWl2PWy9PXrVbO2sp7eMuRSJkf5dGDvasjZ3cLzc9iDxcfcj9awlFXAXDmY8k+kWOZlo+wV/HnnvtxW3hZOMfLHFgKP8CGPxtKyvwLe71HzTCEfdutwlvH7gyTGoTsf2yjO+v/4Y+2zjH5s+t/l2Uy6fqEs+z89jVcrL5VIz5O9/g1WP+UJ4QIVbxXeZihwU907cKGifKFsMzKhWThXmO4KyJ2AaMpt5x35b/Ynr9SIsKW8Rl/fa++uYjiVqh6EFPbqA8IzYtOTYDys+32wmWOHZoqzaOa9PKlSRJfTv83Y/nX9P+4d3Wu0+/s26705NTDtRtKRm3KbLxyHXUidKc82rEFokhoPPM0yMF2pzWSszWlgSu/gWWZeuvOSwzVqmI4MILklvcyo8Resyl+EArXPAYc+AAAe/WlerHz4WmSiWYecjNahhSjnRD+i56+pxR7Bezhe/3zTfMS4D0WeuQUDq6iPGm0KDUoFowe4NNLFQVIMPqgz8+Ax2DF053WCAMhXJj0/JF01qujlQ/7rbvU+KnBgZ/knauBOCynuRK8XtLf1oP9ySvnumMotw8MSqYCDWXW8xPuYZMk+NLbzpqON2dce79zFdsD2W3/jLRh/WQXpigBXuphkF/F6Cey50an/lMD+n3+QQ4gOeTDwdBEqP0hKg2tB8Kd/xerjq+Yx58mBVi9yI8p2uG7PmZvdxDouD37FHmxR4KKvkOf1GMj6v6jrhODHnS0AQGcOz+pYescqedM5ceS4AYTybbwTSzZuuwsshK5qYECX/R8ScA+Ngsz8xIpUPT0AxjQrM4SDG6LS0hn/TULe5164n7ST+bXVu/7sqog8yk+JDeUmAhWc++87dR5IBMN8GsZ3nvzUVnziZIupVOphZ2Jk8jCZ4rhj0C9mBQgIilxBoWMkB2eDXhbNHZBnZ1DybA8/JTGLbbWVM2+lQWSaOocPCnURun0N51Kv3/HNKGh/zJD0DmLJHEvyimXG8jDOMy7Pj0Kv5mUaOi8lZJTw6+gghDHyVc61a3+a+jgay6rx1sgJtm1WR+LxTL+93jqHqrxe8fOjF/KF1/0JL7JeCArHsM1OH6yqCLcJ4yqK5AjJ+y44xTfYMJDgmCGZwS69hyYzRSQJdrq7DTRuGXlSD/5beZcdUdDZtFUjrsHR+J9AdHeSFHKWFpi1yGHAfUQR4wQu+DijKuYAMb+HWqO4UcucPUS9io8+9sEbUYsMTL77PpA8b0XxDaCW0Vs5IR1Jn+AX/VjrDjju96DhR/tMCpasElP6yFvvgbYBlW3WlUc4QnNQ+KqYgw6xH0rkuLGN3iSenkf9fJLi/jTENC6ALV1R8LFvUFpygAFG3pXC42r0gp2QHcDa1P2umZ2NidYJiV/hmwXYWTZns06ZLfgK/bb4pe8PH1tEgxkpCuog+/sVy83Z7FpmxTRSNYGeHtw3YmYO8SVgfYoy6k0FkgeOh8bcbTtC0tgDifO8OJZ3p4oMYYF2vnZon829NR00rxEvmJ21KipJe5m/xhJ7d5iRJIMacohVLCYyMAhII9JXaz7Ev5inee3efKAvej5CI1ZJfrmpWl9UJTwEqv/qS9nzwM3MNfo7LJ7FOozmeEKXbFA4FOGu5iK7OPldSkOyThRCp3GwhWgT5fnvf/EaXjsrDtvN/x1YNLoiRDj3Lw+1+c56tBrV6AByVsJmBK6su5yETR5d7JtTe0Q+lX6BvIhHvGhDb9X1Fdv9ORibmhDl/XKARJGL+eHUfOgZ471T5/U12X7fDFWMarJBsbZrzsHgRYOBKzE2J2GV7QdnM8AZqmbtzehTOT0TJ9QjsauCUBB/HaqI44ZVN/Rn64QsUOdBhpUROdgfn50sj5gybpMs1MnCyN6NZRrgLr4bpi0kk8RnlE5duMvd6AIwkfiGF5l6UvwtxO12lRp7QAAA=="
                  />
                  {/* <img
                    src="/assets/images/banners/mobile/1-Bakery-Equipment-nobarun.webp"
                    alt="hero Mobile Image one"
                    className="mobile-banner"
                  /> */}
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/2-Slaughterhouse-Equipment-4.webp"
                    alt="hero Image two"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/2-Slaughterhouse-Equipment-4.webp"
                    alt="hero Mobile Image two"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/3-Supermarket-Equipment-with-logo.webp"
                    alt="hero Image Three"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/3-Supermarket-Equipment-with-logo.webp"
                    alt="hero Mobile Image Three"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/4-Slaughterhouse-Equipment.webp"
                    alt="hero Image Four"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/4-Slaughterhouse-Equipment.webp"
                    alt="hero Mobile Image Four"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/5-Metal-Detector-&-Scanning-System.webp"
                    alt="hero Image Five"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/5-Metal-Detector-&-Scanning-System.webp"
                    alt="hero Mobile Image Five"
                    className="mobile-banner"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/6-Slaughterhouse-Equipment-nobarun.webp"
                    alt="hero Image Six"
                    className="desktop-banner"
                  />
                  <img
                    src="/assets/images/banners/mobile/6-Slaughterhouse-Equipment-nobarun.webp"
                    alt="hero Mobile Image Six"
                    className="mobile-banner"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        {/* hero section end */}

        {/* out clients section start */}
        <section className="our-clients-section">
          <div className="container">
            <div className="client-heading">
              <h2>Our Clients</h2>
              <Link href={`/clients`}>
                <a>
                  <span>View All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="clients-main-wrap">
              {clients
                .filter((item, index) => item && index < 8)
                .map((item, index) => (
                  <Link href="#" key={index}>
                    <a>
                      <div className="client-box">
                        <img
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}
                          alt={`Image for ${item.title} client`}
                          className="lazyload"
                          loading="lazy"
                        />
                        <p>{item.title}</p>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </section>
        {/* out clients section end */}

        {/* featured categories section start */}
        <section className="featured-categories-section">
          <div className="container">
            <div className="client-heading text-begin">
              <h3>Featured Categories</h3>
            </div>
            <div className="category-main-wrap">
              {featuredCategories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}>
                  <a>
                    <div className="category-box">
                      <div className="img-placee">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL + category.image
                          }
                          alt={`Thumbnail for ${category.name} featured category`}
                        />
                      </div>
                      <h4>{category.name}</h4>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* featured categories section end */}
      </main>
    </>
  );
};
HomePage.layout = AppLayout;

export async function getStaticProps() {
  let categories = [];
  let clients = [];
  let count = null;
  let collections = [];
  let featuredCategories = [];
  try {
    categories = await useAllProductCategories();
    categories = JSON.parse(JSON.stringify(categories));
    featuredCategories = categories.filter((category) => category.isFeatured);
  } catch (e) {}
  try {
    let { data } = await client.query({
      query: gql`
        query getFeaturedClients {
          getAllFeaturedClients {
            id
            title: clientName
            imgUrl: logo
          }
        }
      `,
    });
    clients = data.getAllFeaturedClients;
  } catch (e) {}
  try {
    let { data } = await client.query({
      query: gql`
        query getCollectionWiseProduct {
          getAllPopulatedCollection {
            name
            slug
            products {
              product {
                id: slug
                productName
                discount
                featured
                populatedCategory {
                  name
                  icon
                }
              }
              reviewCount
              ratingAverage
            }
          }
        }
      `,
    });
    collections = data.getAllPopulatedCollection;
  } catch (e) {
  } finally {
    return {
      props: {
        clients,
        categories,
        featuredCategories,
        collections,
        count,
      },
      revalidate: 10,
    };
  }
}

export default HomePage;
