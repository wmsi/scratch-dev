# NOTE: This file is generated by yotta: changes will be overwritten!

cmake_minimum_required(VERSION 2.8.11)

include_directories("/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source")


set(YOTTA_AUTO_BLE-NRF51822_CPP_FILES
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/custom/custom_helper.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xDiscoveredCharacteristic.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_security.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xGap.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xCharacteristicDescriptorDiscoverer.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_discovery.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xServiceDiscovery.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xGattServer.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xGattClient.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_advertising.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xn.cpp"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_gap.cpp"
)
# force dependency on the config header for cpp files, which CMake otherwise wouldn't track:
set_property(SOURCE ${YOTTA_AUTO_BLE-NRF51822_CPP_FILES} PROPERTY OBJECT_DEPENDS "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/build/bbc-microbit-classic-gcc/yotta_config.h")
set(YOTTA_AUTO_BLE-NRF51822_HEADER_FILES
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xCharacteristicDescriptorDiscoverer.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_advertising.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xDiscoveredCharacteristic.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xGattServer.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xGattClient.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xSecurityManager.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/common/ble_error.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xGap.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/common/ansi_escape.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xn.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/nRF5xServiceDiscovery.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/common/binary.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/common/common.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/custom/custom_helper.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_gap.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/projectconfig.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/common/assertion.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_security.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/btle/btle_discovery.h"
    "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/common/compiler.h"
)
# force dependency on the config header for header files, which CMake otherwise wouldn't track:
set_property(SOURCE ${YOTTA_AUTO_BLE-NRF51822_HEADER_FILES} PROPERTY OBJECT_DEPENDS "/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/build/bbc-microbit-classic-gcc/yotta_config.h")


add_library(ble-nrf51822
    ${YOTTA_AUTO_BLE-NRF51822_CPP_FILES}
    ${YOTTA_AUTO_BLE-NRF51822_HEADER_FILES}
)

yotta_postprocess_target(LIBRARY ble-nrf51822)



target_link_libraries(ble-nrf51822
    ble
    nrf51-sdk
)

include("/Users/bucchierimarc/Documents/WMSI/scratch-microbit-firmware-master/yotta_modules/ble-nrf51822/source/supress-warnings.cmake")
