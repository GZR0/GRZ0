Gravity-qt: Qt5 GUI for Gravity
===============================

Build instructions
===================

Raspbian (Raspberry Pi)
(Validated on Linux raspberry 3.16.0-4-686-pae #1 SMP Debian 3.16.43-2+deb8u1 (2017-06-18) i686 GNU/Linux)
-----------------------------------------------------------------------------------------------------------------------

1. Install all updates.
	sudo apt-get update && sudo apt-get upgrade 

2. Install general dependencies.
	sudo apt-get install git build-essential libtool autotools-dev autoconf pkg-config libssl-dev libcrypto++-dev libevent-dev libminiupnpc-dev libgmp-dev libboost-all-dev devscripts libdb++-dev libsodium-dev
	
3. Install QT dependencies.
	sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler libcrypto++-dev libminiupnpc-dev qt5-default
	
4. Install the Bitcoin PPA files, we need these for compiling the code. You need to create and edit a file in your sources.list.d folder. The following commands will get that done.
	cd /etc/apt/sources.list.d/
	sudo nano bitcoin.list

5. Nano edittor is now open, editting bitcoin.list. You need to add the following line to this file.
	deb-src http://ppa.launchpad.net/bitcoin/bitcoin/ubuntu artful main

6. Write the file and close nano edittor by pressing CTRL+X and "Y" to confirm write.

7. Now, download the public key for the PPA packages. This way, the system verifies the packages have not been tampered with.
	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv C70EF1F0305A1ADB9986DBD8D46F45428842CE5E 

8. Run the apt-get update tool.
	sudo apt-get update

9. You need a specific version of libssl. Check your version, using command below. It should be OpenSSL 1.0.1t  3 May 2016
built on: Wed Nov 21 19:45:34 2018. If it is NOT, then execute step 10.
	openssl version -a

10. ONLY execute this step if you have the wrong OpenSSL version!
	Remove old version.
		cd && sudo apt-get remove libssl-dev\
	Next, set your repository list to point to "jessie" in stead of "stretch". This can be done by editting a file.
		sudo nano /etc/apt/sources.list
		replace every instance "stretch" with "jessie"
	Exit nano edittor by pressing CTRL+X and confirming the write with "Y".
	After editting the sources.list file, reinstall the SSL software
		sudo apt-get update
		sudo apt-get install libssl-dev

11. Now, download the GZRO wallet into a folder. First, create the folder, then download the source. Note the spelling of the github-link!
	mkdir gzro-wallet
	cd gzro-wallet
	git clone https://github.com/GZR0/GRZ0.git

12. Move into this folder as superuser.
	sudo -i
	cd /home/pi/gzro-wallet
	
13. Issue the qmake and make command to install the wallet. This might take a while (depending on your CPU, up to two hours).
	sudo qmake && sudo make 

14. Done! Let's create a shortcut on your Desktop, so you can launch the wallet by double-clicking.
	cp gravity-qt /home/pi/Desktop 
	
15. Start your wallet by double-clicking the icon on your Desktop.



Debian
-------

First, make sure that the required packages for Qt5 development of your
distribution are installed, for Debian and Ubuntu these are:

::

    apt-get install qt5-default qt5-qmake qtbase5-dev-tools qttools5-dev-tools \
        build-essential libboost-dev libboost-system-dev \
        libboost-filesystem-dev libboost-program-options-dev libboost-thread-dev \
        libssl-dev libdb++-dev

then execute the following:

::

    qmake
    make

Alternatively, install Qt Creator and open the `gravity-qt.pro` file.

An executable named `gravity-qt` will be built.


Windows
--------

Windows build instructions:

- Download the `QT Windows SDK`_ and install it. You don't need the Symbian stuff, just the desktop Qt.

- Compile openssl, boost and dbcxx.

- Open the .pro file in QT creator and build as normal (ctrl-B)

.. _`QT Windows SDK`: http://qt-project.org/downloads


Mac OS X
--------

- Download and install the `Qt Mac OS X SDK`_. It is recommended to also install Apple's Xcode with UNIX tools.

- Download and install `MacPorts`_.

- Execute the following commands in a terminal to get the dependencies:

::

	sudo port selfupdate
	sudo port install boost db48 miniupnpc

- Open the .pro file in Qt Creator and build as normal (cmd-B)

.. _`Qt Mac OS X SDK`: http://qt-project.org/downloads
.. _`MacPorts`: http://www.macports.org/install.php


Build configuration options
============================

UPNnP port forwarding
---------------------

To use UPnP for port forwarding behind a NAT router (recommended, as more connections overall allow for a faster and more stable gravity experience), pass the following argument to qmake:

::

    qmake "USE_UPNP=1"

(in **Qt Creator**, you can find the setting for additional qmake arguments under "Projects" -> "Build Settings" -> "Build Steps", then click "Details" next to **qmake**)

This requires miniupnpc for UPnP port mapping.  It can be downloaded from
http://miniupnp.tuxfamily.org/files/.  UPnP support is not compiled in by default.

Set USE_UPNP to a different value to control this:

+------------+--------------------------------------------------------------------------+
| USE_UPNP=- | no UPnP support, miniupnpc not required;                                 |
+------------+--------------------------------------------------------------------------+
| USE_UPNP=0 | (the default) built with UPnP, support turned off by default at runtime; |
+------------+--------------------------------------------------------------------------+
| USE_UPNP=1 | build with UPnP support turned on by default at runtime.                 |
+------------+--------------------------------------------------------------------------+

Notification support for recent (k)ubuntu versions
---------------------------------------------------

To see desktop notifications on (k)ubuntu versions starting from 10.04, enable usage of the
FreeDesktop notification interface through DBUS using the following qmake option:

::

    qmake "USE_DBUS=1"

Generation of QR codes
-----------------------

libqrencode may be used to generate QRCode images for payment requests. 
It can be downloaded from http://fukuchi.org/works/qrencode/index.html.en, or installed via your package manager. Pass the USE_QRCODE 
flag to qmake to control this:

+--------------+--------------------------------------------------------------------------+
| USE_QRCODE=0 | (the default) No QRCode support - libarcode not required                 |
+--------------+--------------------------------------------------------------------------+
| USE_QRCODE=1 | QRCode support enabled                                                   |
+--------------+--------------------------------------------------------------------------+


Berkely DB version warning
==========================

A warning for people using the *static binary* version of Gravity on a Linux/UNIX-ish system (tl;dr: **Berkely DB databases are not forward compatible**).

The static binary version of Gravity is linked against libdb 5.0 (see also `this Debian issue`_).

Now the nasty thing is that databases from 5.X are not compatible with 4.X.

If the globally installed development package of Berkely DB installed on your system is 5.X, any source you
build yourself will be linked against that. The first time you run with a 5.X version the database will be upgraded,
and 4.X cannot open the new format. This means that you cannot go back to the old statically linked version without
significant hassle!

.. _`this Debian issue`: http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=621425

Ubuntu 11.10 warning
====================

Ubuntu 11.10 has a package called 'qt-at-spi' installed by default.  At the time of writing, having that package
installed causes gravity-qt to crash intermittently.  The issue has been reported as `launchpad bug 857790`_, but
isn't yet fixed.

Until the bug is fixed, you can remove the qt-at-spi package to work around the problem, though this will presumably
disable screen reader functionality for Qt apps:

::

    sudo apt-get remove qt-at-spi

.. _`launchpad bug 857790`: https://bugs.launchpad.net/ubuntu/+source/qt-at-spi/+bug/857790
