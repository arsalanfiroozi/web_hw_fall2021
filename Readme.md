Kubernetes
==========

<div style="direction:rtl;">
تحقیق میانترم سال ۱۴۰۰

اعضای گروه:
</div>

* Erfan Nosrati, 97102558
* Arsalan Firoozi, 97102225
* Amirhossein Javadi, 97101489

<hr>

<div style="direction:rtl;">
<h2>قسمت اول: آشنایی با <b>Kubernetes</b></h2>

<div style="text-align:center">
<img src="./pics/1.png">
</div>

کوبرنتیز یا K8s (که عدد ۸ بیانگر تعداد حروف بین K و s است) یک پلتفرم متن باز است که توسط گوگل توسعه یافته است و اجرا و مدیریت اتوماتیک کانتینر هارا بر عهده می‌گیرید و به شما در مدیریت اجرای برنامه کانتینری در محیط‌های مختلف مانند سرورها؛ سرویس های ابری و ... کمک می‌کند. برای ادامه بحث و فهمیدن هرچه بهتر کوبرنتیز باید ابتدا با مفهوم کانتینر آشنا شویم. (می‌توانید در صورتی که با این مفهوم آشنایی دارید از این قسمت عبور کنید.)
<br>
<br>
<br>
<h3>استقرار برنامه</h3>
استقرار برنامه در طول زمان دچار دگرونی هایی شده است. استقرار برنامه به طور سنتی به این شکل بود که برنامه روی سخت افزار یک سیستم عامل نصب می‌شود و چندین برنامه روی این سیستم عامل اجرا می‌شوند. همانطور که قابل حدس است این شیوه از استقرار نرم افزار ممکن است باعث تداخل در منابع تخصیص یافته شود. برای مثال در نظر بگیرید که یک برنامه بیشتر منابع را در اختیار بگیرد و باعث شود برنامه‌های دیگر عملکرد مناسب خود را نداشته باشند.
<br>
<br>
مشکل دیگر این روش کار نکردن درست برنامه در ماشین‌های متفاوت است. فرض کنید یک برنامه نویس یک برنامه را توسعه داده و در ماشین خودش تمام تست‌ها را پاس کرده اما وقتی این برنامه را به تیم عملیات می‌دهد این برنامه به درستی کار نمی‌کند و این درست کار نکردن به علت خیلی مشکلات از قبیل تفاوت در لایبری‌ها و ورژن های آنها و ... می‌تواند باشد. ( برای خواندن میم های جذاب در این باره عبارت but it works on my machine meme را جستجو کنید :) )
<br>
<div style="text-align:center"><img src="./pics/2.jpg"></div>

شیوه دیگر استقرار برنامه مجازی‌سازی است (Virtualized) در این روش بر روی یک سیستم عامل ماشین‌‌های مجازی ساخته می‌شوند که این ماشین های مجازی سیستم عامل خود را دارند و این باعث ایزوله شدن برنامه‌های ماشین‌های مجازی مختلف می‌شود و باعث بهبود مقیاس پذیری و توانایی نگه‌داری از برنامه می‌شود.
<br>
<br>
شیوه نوین استقرار برنامه شیوه استقرار توسط کانتینر ها است. ایده کانتینر از شرکت های کشتی رانی گرفته شده است چون در شرکت‌های کشتی رانی محموله حمل شده مهم نیست آنها صرفا تعدادی جعبه فلزی به اسم کانتینر را جا‌به‌جا‌ و نگه داری می‌کنند و با محتوای داخلی آن ها کاری ندارند.
<br>
<br>
کانتینرها‌ مانند سبک‌تر از ماشین‌های مجازی هستند و با این تفاوت که می‌توانند به طور مستقل از هم بر روی یک سیستم عامل اجرا شوند و این ویژگی باعث می‌شود که ایجاد و استقرار برنامه به روش کانتینر مزیت‌های بسیاری مانند سریع بودن؛ ایجاد روش امن برای عقب‌گرد: عملکرد تقریبا یکسان در همه پلتفرم ها و ... را داراست.در ادامه متن هر کجا از داکر که یکی از محبوب ترین روش کانتینر کردن اپلیکیشن هاست استفاده کردیم منظور روش استقرار به وسیله کانتینرها است.<br>
<div style="text-align:center"><img src="./pics/3.jpg"></div>
<br>
<br>
<h3>کوبرنتیز چه کاری انجام می‌دهد؟</h3>
قبل از اینکه در مورد کوبرنتیز صحبت کنیم ابتدا ببینیم که یک ابزار ارکستریشن (مانند کوبرنتیز) چیست؟
<br>
<br>
به وجود آمدن مفهوم ماکروسرویس ها باعث پرطرفدار شدن کانتینرها شد زیرا بسترهای سبکی هستند که می‌توانند این برنامه های سبک و مستقل را در خود اجرا کنند. و مدیریت این کانتینرها که در محیط‌های مختلف با استفاده از اسکریپت‌ها و برنامه‌های تحت نظر انسان قابل انجام نیست یا بسیار سخت است. برای مثال زمانی که در مرحله production هستیم اطمینان از بالا بودن برنامه برای ما بسیار مهم است و در این نقطه است که کوبرنتیز به کمک ما آمده و مدیریت کانتینرها را بر عهده می‌گیرید.
<br>
<br>
کوبرنتیز سرویس های زیر را ارائه می‌ده:

1. دردسترس بودن و نگه داری از سرویس ها: یکی از تضمین هایی که کوبرنتیز به ما می‌دهد نبود زمانی است که سرویس ها پایین باشند. برای مثال اگر یک کانتینر دچار مشکل شود کوبرنتیز سعی می‌کند آن را بازیابی کند و یا یک کانتینر دیگر با آن جایگزین کند.
1. مقیاس پذیری: کوبرنتیز اجازه افزایش ظرفیت برنامه شما را به صورت سریع می‌دهد.
1. پخش بار: کوبرنتیز می‌توانند درخواست ها را بین کانتینر های مختلف تقسیم کند به طوری که سیستم پایدار باشد.
1.  منتشر کردن و عقب‌گرد اتوماتیک: فرض کنید که می‌خواهید ورژن جدید برنامه خود را منتشر کنید و می‌‌خواهید کارایی آن را تست کنید. برای اینکار ۱۰ درصد از کاربران خود را انتخاب کرده و درخواست این افراد را به ورژن جدید انتقال می‌دهید و تست های خود را انجام می‌دهید اگر موفقیت آمیز بود ورژن جدید را منتشر کرده و همه کاربران را به ورژن جدید می‌برید و در صورت خرابی به ورژن قبلی عقب گرد می‌کنید. این کار که در اینجا توصیف شد را می‌توان به صورت خودکار توسط کوبرنتیز انجام داد.
1. تخصیص بهنیه سخت افزار: کوبرنتیز این قابلیت را به شما می‌دهد تا منابع مورد نیاز برای هر کانتینر را مشخص کنید سپس خود کوبرنتیز با توجه به میزان سخت افزار شما کانتینرها را به صورتی انتخاب می‌کند که بهترین استفاده را از سخت افزار شما داشته باشد.
1. بازیابی: یکی دیگر از امکاناتی که کوبرنتیز در اختیار شما قرار می‌دهد امکان بازیابی اطلاعات و حالت برنامه هنگام وقوع یک خطا است.
<br>
<br>
<h3>چه کاری را انجام نمی‌دهد؟</h3>
اما باید در نظر داشته باشیم که کوبرنتیز یک محیط با سخت افزار نیست و روی سخت افزار شما بالا می‌آید و کارهایی مانند ‌‌Build و تست سورس کد های یا فرآیند های CI/CD را انجام نمی‌دهد. همچنین کوبرنتیز خدمات لایه اپلیکیشن را ارائه نمی‌دهد و تنها image ها و کانتینر های شما را مدیریت می‌کند.
<br>
<br>
<h3>نتیجه گیری</h3>
کوبرنتیز مدیریت و اتوماسیون استقرار یک سیستم مبتنی بر کانتینر را بر عهده دارد. در قسمت بعد درباره چگونگی انجام این کار توسط کوبرنتیز و قسمت های مختلف آن توضیح می‌دهیم.

<hr>
<h2>قسمت دوم: کوبرنتیز چگونه کار می‌کند؟</h2>
در قسمت قبل با کوبرنتیز آشنا شدیم و فهمیدیم کوبرنتیز چه کارهایی را برای ما انجام می‌دهد. در این قسمت ابتدا با معماری کوبرنتیز و سپس با اجزای مختلف آن آشنا می‌شویم.
<br>
<br>
<h3>معماری کوبرنتیز</h3>
کوبرنتیز از حداقل یک کنترل کننده (Control Plane) و یک ماشین کارگر (که به آن Node یا Worker Node گفته می‌شود) تشکیل شده است. کنترل کننده که بیشتر فرآیندهای (Processes) کوبرنتیز در آن اجرا می‌شوند؛ نقش
مدیریت، نظارت و هماهنگی کار بین گره‌های کارگر(Worker Node) را دارد که برنامه ها را اجرا می‌کنند و بیشتر منابع سخت افزاری را در اختیار دارند زیرا اجرای برنامه اصلی بر عهده همین نود‌های کارگر است و کنترل کننده تنها بر درستی و سالم بودن و دیگر موارد هماهنگ کننده بین این نود‌ها از قبیل تست‌ها و ... نظارت می‌کند.
<br>
<div style="text-align:center"><img src="./pics/4.png"></div>
<br>
<br>
<h3>اجزای تشکیل دهنده Node</h3>
نودها سرور ها یا ماشین های مجازی هستند و از اجزای زیر تشکیل شده اند:<br>

![alt text](./pics/5.png)

* پاد (‌Pod):<br>
پاد کوچکترین قسمت نودهای کارگر هستند که یک لایه Abstraction به کانتینر ها اضافه می‌کند و در اصل بستر اجرای ایمیج‌ها و کانتینرها است و معمولا در هر پاد تنها یک کانتینر اجرا می‌شود. و اضافه شدن این لایه باعث‌ می‌شود پیچیدگی های سطح کانتینر در کوبرنتیز وارد نشود. هر پاد زمانی که اجرا می‌شود یک IP جدید می‌گیرید و این در جایی مشکل ساز می‌شود که یک از پادهای دچار خطا می‌شود و یک پاد دیگر را جایگزین آن می‌کنیم. در این صورت باید در اجزای دیگر که با این پاد در ارتباط هستند IP جدید را بروزرسانی کنیم.
* سرویس (Service): <br>
برای حل کردن مشکل ‌عوض شدن IP پادها سرویس ها استفاده می‌شوند. سرویس ها IP های ثابتی هستند که به یک پاد متصل می‌شوند و با از بین رفتن یک پاد سرویس از بین نمی‌رود و پاد جایگزین شده به این سرویس متصل شده و در این صورت پاد‌های ما همواره IP های ثابتی دارند که با از بین رفتن و جایگزین شدن پادها تغییر نمی‌کنند.
* کیوبلت (Kubelet):<br>
کیوبلت‌ها ایجنت‌هایی هستند که اطمینان حاصل می‌کنند تا کانتینر ها درون پادها به درستی اجرا می‌شوند و همچنین ارتباط بین Node های مختلف را ممکن می‌سازند.
* کانفیگ مپ (ConfigMaps):<br>
برای توضیح این کامپوننت از یک مثال استفاده می‌کنیم. فرض کنید یک برنامه دارید که دیتا های خود را درون یک دیتابیس ذخیره می‌کند. پس باید آدرس این دیتابیس را درجایی ذخیره کنیم. اگر این آدرس را داخل ایمیج ساخته شده قرار دهیم و در زمانی دیگر آدرس دیتابیس تغییر کند ما مجبور می‌شویم ایمیج ساخته شده را دوباره بیلد کنیم و در داخل ریپازیتوری قرار دهیم و سپس این ایمیج را از ریپازیتوری برداریم. برای رفع این مشکل یک کامپوننت با نام ‌ConfigMap در کوبرنتیز وجود دارد که به ما این امکان را می‌دهد تا دیتاهای تغییرپذیر و خارجی مانند آدرس دیتا بیس را در آن ذخیره کنیم و در صورت تغییر این داده ها تنها این داده ها را تغییر داده و نیازی به فرآیندهای بیلد و پوش کردن ایمیج نباشد.
* Secret:<br>
حال در همان مثال بالا حالتی را در نظر بگیرید که می‌خواهید نام‌کاربر و رمز دیتابیس که آن ها نیز تغییر پذیرند را در جایی ذخیره کنید از آن جایی که ConfigMap تنها برای دیتاهای غیرمحرمانه است کامپوننت دیگری به نام secret وجود دارد که می‌توان داده‌های با حساسیت بالاتر را در آن ها ذخیره کرد.
<br>
<br>
<h3>اجزای تشکیل دهنده کنترل کننده (Control Plane)</h3>

* kube-apiserver:<br>
این ماژول؛ در حقیقت ماژول ارتباطی ما با کوبرنتیز است که ما می‌توانیم با API یا UI یا CLT بسته به نوع استفاده (برای مثال داشبورد یا استفاده از اسکریپت‌های اتوماتیک) از آن استفاده کنیم. ‌
* kube-scheduler:<br>
این کامپوننت پاد‌های جدید را که داری نود نیستند در نود ها قرار می‌دهد. برای مثال فرض کنید دو نود داریم که یکی از 60 درصد منابعش استفاده کرده است و دیگری از 20 درصد منابع در این صورت این کامپوننت پاد جدید به وجود آمده را در داخل نودی که منابع بیشتری دارد قرار می‌دهد.
* etcd:<br>
این کامپوننت دیتاهای کلاستر های ما را نگه داری می‌کند. و کلاستر ها از این دیتا ها برای برای بازسازی در زمانی که خطا رخ می‌دهند استفاده می‌کنند.
* kube-controller-manager:<br>
این کامپوننت تغییرات داخل کلاستر را دنبال می‌کند و مدیریت می‌کند.مثلا اگر کانتینری نیاز به تعمیر داشته باشد یا خراب شده باشد آن را درست یا جایگزین می‌کند.
<br>
<br>
<h3>نتیجه‌گیری</h3>
در این قسمت درباره قسمت‌های اصلی کوبرنتیز صحبت کردیم و اجزای اصلی کنترل‌کننده و Node های آن را به صورت مختصر مورد بررسی قرار دادیم.