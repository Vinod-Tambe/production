import React from "react";
import { Icon } from "@iconify/react";
function Sidebar() {
  return (
    <div>
      <div class="main-nav">
        <div class="logo-box">
          <a href="index.html" class="logo-dark">
            <img
              src="../assets/images/logo-sm.png"
              class="logo-sm"
              alt="logo sm"
            />
            <img
              src="../assets/images/logo-dark.png"
              class="logo-lg"
              alt="logo dark"
            />
          </a>

          <a href="index.html" class="logo-light">
            <img
              src="../assets/images/logo-sm.png"
              class="logo-sm"
              alt="logo sm"
            />
            <img
              src="https://moein.video/wp-content/uploads/2021/12/Whatsapp-Logo-GIF-WhatsApp-Icon-GIF-Royalty-Free-Animated-Icon-GIF-350px-after-effects-project.gif"
              class="logo-lg"
              alt="logo light"
              width={"81px"}
              height={"74px"}
            />
          </a>
        </div>

        <button
          type="button"
          class="button-sm-hover"
          aria-label="Show Full Sidebar"
        >
          <Icon
            icon="solar:double-alt-arrow-right-bold-duotone"
            class="button-sm-hover-icon"
          ></Icon>
        </button>

        <div class="scrollbar" data-simplebar>
          <ul class="navbar-nav" id="navbar-nav">
            <li class="menu-title">General</li>

            <li class="nav-item">
              <a class="nav-link" href="./home">
                <span class="nav-icon">
                  <Icon icon="solar:widget-5-bold-duotone"></Icon>
                </span>
                <span class="nav-text"> Dashboard </span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="./chat">
                <span class="nav-icon">
                  <Icon icon="bi:chat-dots-fill"></Icon>
                </span>
                <span class="nav-text"> Messenger </span>
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarCategory"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarCategory"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:event"></Icon>
                </span>
                <span class="nav-text"> Events </span>
              </a>
              <div class="collapse" id="sidebarCategory">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="./events">
                      All Events
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="category-edit.html">
                      Add New Events
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarInventory"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarInventory"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:lock-open-outline"></Icon>
                </span>
                <span class="nav-text"> Access </span>
              </a>
              <div class="collapse" id="sidebarInventory">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="inventory-warehouse.html">
                      Warehouse
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a
                      class="sub-nav-link"
                      href="inventory-received-orders.html"
                    >
                      Received Orders
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarOrders"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarOrders"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:account-plus"></Icon>
                </span>
                <span class="nav-text"> Hiring </span>
              </a>
              <div class="collapse" id="sidebarOrders">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="orders-list.html">
                      List
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="order-detail.html">
                      Details
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="order-cart.html">
                      Cart
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="order-checkout.html">
                      Check Out
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarPurchases"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarPurchases"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:bullhorn"></Icon>
                </span>
                <span class="nav-text"> Announcements </span>
              </a>
              <div class="collapse" id="sidebarPurchases">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="purchase-list.html">
                      List
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="purchase-order.html">
                      Order
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="purchase-returns.html">
                      Return
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarAttributes"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarAttributes"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:briefcase-outline"></Icon>
                </span>
                <span class="nav-text"> Projects </span>
              </a>
              <div class="collapse" id="sidebarAttributes">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="attributes-list.html">
                      List
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="attributes-edit.html">
                      Edit
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="attributes-add.html">
                      Create
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="./calender">
                <span class="nav-icon">
                  <Icon icon="solar:widget-5-bold-duotone"></Icon>
                </span>
                <span class="nav-text"> Calendar </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./todo">
                <span class="nav-icon">
                  <Icon icon="mdi:checkbox-blank-outline"></Icon>
                </span>

                <span class="nav-text"> Todo </span>
              </a>
            </li>

            <li class="menu-title mt-2">Employee</li>

            <li class="nav-item">
              <a class="nav-link" href="pages-profile.html">
                <span class="nav-icon">
                  <Icon icon="fluent:star-checkmark-24-filled"></Icon>
                </span>
                <span class="nav-text"> Performance </span>
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarRoles"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarRoles"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:account-group"></Icon>
                </span>
                <span class="nav-text"> Employee </span>
              </a>
              <div class="collapse" id="sidebarRoles">
                <ul class="nav sub-navbar-nav">
                  <ul class="nav sub-navbar-nav">
                    <li class="sub-nav-item">
                      <a class="sub-nav-link" href="./add-emp">
                        Add Employee
                      </a>
                    </li>
                    <li class="sub-nav-item">
                      <a class="sub-nav-link" href="./emp-list">
                        All Employee
                      </a>
                    </li>
                    <li class="sub-nav-item">
                      <a class="sub-nav-link" href="./active-emp-list">
                        Active Employee List
                      </a>
                    </li>
                    <li class="sub-nav-item">
                      <a class="sub-nav-link" href="./deactive-emp-list">
                        Deactive Employee List
                      </a>
                    </li>
                  </ul>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="pages-permissions.html">
                <span class="nav-icon">
                  <Icon icon="mdi:calendar-clock"></Icon>
                </span>
                <span class="nav-text"> Attendance </span>
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarCustomers"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarCustomers"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:file-document-box-outline"></Icon>
                </span>
                <span class="nav-text"> Policies </span>
              </a>
              <div class="collapse" id="sidebarCustomers">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="customer-list.html">
                      Policy List
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="customer-detail.html">
                      Add Policies
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#sidebarSellers"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarSellers"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:calendar-remove-outline"></Icon>
                </span>
                <span class="nav-text"> Leave Management </span>
              </a>
              <div class="collapse" id="sidebarSellers">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-list.html">
                      List
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-details.html">
                      Details
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-edit.html">
                      Edit
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-add.html">
                      Create
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a
                class="nav-link menu-arrow"
                href="#paymentsSellers"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarSellers"
              >
                <span class="nav-icon">
                  <Icon icon="mdi:cash-multiple"></Icon>
                </span>
                <span class="nav-text"> Payments</span>
              </a>
              <div class="collapse" id="paymentsSellers">
                <ul class="nav sub-navbar-nav">
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-list.html">
                      Payments
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-details.html">
                      Salary Slip
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-edit.html">
                      Edit
                    </a>
                  </li>
                  <li class="sub-nav-item">
                    <a class="sub-nav-link" href="seller-add.html">
                      Create
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pages-permissions.html">
                <span class="nav-icon">
                  <Icon icon="mdi:gift-outline"></Icon>
                </span>
                <span class="nav-text"> Benefits </span>
              </a>
            </li>
            <li class="menu-title mt-2">Other</li>
            <li class="nav-item">
              <a class="nav-link" href="pages-review.html">
                <span class="nav-icon">
                  <Icon icon="solar:chat-square-like-bold-duotone"></Icon>
                </span>
                <span class="nav-text"> Reviews </span>
              </a>
            </li>
            <li class="nav-item cursor-pointer">
              <a
                class="nav-link"
                data-bs-toggle="offcanvas"
                data-bs-target="#theme-settings-offcanvas"
                aria-controls="theme-settings-offcanvas"
              >
                <span class="nav-icon">
                  <Icon icon="solar:settings-bold-duotone"></Icon>
                </span>
                <span class="nav-text"> Settings </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
